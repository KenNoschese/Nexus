import { db } from "@/app/db";
import { tasks } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import TaskMainClient from "./taskMainClient";

export default async function TaskMain() {
  const { userId } = await auth();
  if (!userId) return null;

  let allTasks: typeof tasks.$inferSelect[] = [];
  try {
    allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
  } catch (error) {
    console.error("Failed to fetch tasks for taskboard:", error);
  }

  const tasksByEnergy = {
    high: allTasks.filter(t => t.energyLevel === 'high'),
    medium: allTasks.filter(t => t.energyLevel === 'medium'),
    low: allTasks.filter(t => t.energyLevel === 'low'),
  };

  return <TaskMainClient tasksByEnergy={tasksByEnergy} />;
}
