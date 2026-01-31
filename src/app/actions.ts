"use server";

import { db } from "@/app/db"; 
import { tasks, energyLevelEnum } from "@/app/db/schema";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const energyLevel = formData.get("energyLevel") as "high" | "medium" | "low" | null;

  if (!title) return;

  await db.insert(tasks).values({
    title,
    energyLevel: energyLevel || "medium",
  });

  revalidatePath("/");
}