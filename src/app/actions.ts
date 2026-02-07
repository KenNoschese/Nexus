"use server";

import { db } from "@/app/db"; 
import { tasks, users } from "@/app/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createTask(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("You must be logged in to create a task");

  const title = formData.get("title") as string;
  const rawEnergyLevel = formData.get("energyLevel") as string;
  const description = formData.get("description") as string;
  const rawDueDate = formData.get("due_date") as string;
  const rawDuration = formData.get("estimated_duration") as string;

  const duration = rawDuration ? Number(rawDuration) : null;

  
  if (!title) return;

  const validEnergyLevels = ["high", "medium", "low"];
const energyLevel = validEnergyLevels.includes(rawEnergyLevel) 
    ? (rawEnergyLevel as "high" | "medium" | "low") 
    : "medium";

    const dueDate = rawDueDate ? new Date(rawDueDate) : null;

  // Ensure user exists in our DB to satisfy foreign key constraint
  await db.insert(users).values({ id: clerkId }).onConflictDoNothing();

  await db.insert(tasks).values({
    title,
    description,
    energyLevel,
    dueDate,
    estimatedDuration: duration,
    userId: clerkId, 
  });

  revalidatePath("/");
}

export async function deleteTask(taskId: string) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
  revalidatePath("/");
}

export async function linkMoodleAccount(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const loginRes = await fetch(`https://daigler25.addu.edu.ph/login/token.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      username: username,
      password: password,
      service: 'moodle_mobile_app'
    })
  });
  const { token } = await loginRes.json();

  if (!token) return { error: "Failed to link: Check your AdDU credentials." };

  const infoRes = await fetch(`https://daigler25.addu.edu.ph/webservice/rest/server.php?wstoken=${token}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`);
  const { userid: moodleUserId } = await infoRes.json();

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      moodleToken: token,
      moodleUserId: moodleUserId,
      moodleLinked: true
    }
  });

  return { success: true };
}

export async function unlinkModdleAccount() {
  const { userId } = await auth();

  if(!userId) throw new Error ("Unauthorized");

  const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      moodleToken: null,
      moodleUserId: null, 
      moodleLinked: false
    }
  });

  return {success: true};
}