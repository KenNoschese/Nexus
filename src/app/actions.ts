"use server";

import { db } from "@/app/db"; 
import { tasks, users } from "@/app/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const rawEnergyLevel = formData.get("energyLevel") as string;
  const validEnergyLevels = ["high", "medium", "low"];
  const energyLevel = validEnergyLevels.includes(rawEnergyLevel) 
    ? (rawEnergyLevel as "high" | "medium" | "low") 
    : "medium";

  if (!title) return;

  let userId: string;

  const existingUsers = await db.select().from(users).limit(1);

  if (existingUsers.length > 0) {
    userId = existingUsers[0].id;
  } else {
    const newUsers = await db.insert(users).values({
      email: "demo@example.com",
      fullName: "Demo User",
      passwordHash: "placeholder",
    }).returning({ id: users.id });
    userId = newUsers[0].id;
  }

  await db.insert(tasks).values({
    title,
    energyLevel: energyLevel || "medium",
    userId,
  });

  revalidatePath("/");
}

export async function deleteTask(taskId: string) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
  revalidatePath("/");
}