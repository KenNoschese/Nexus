import { currentUser } from "@clerk/nextjs/server";
import { getEnrolledCourses, getCourseAssignments } from "../lib/moodle";
import Link from "next/link";
import { db } from "@/app/db";
import { tasks } from "@/app/db/schema";
import { eq } from "drizzle-orm";

async function summary() {
    const user = await currentUser();
    const metadata = user?.privateMetadata;
        
    const courses = (metadata?.moodleToken && metadata?.moodleUserId) 
      ? await getEnrolledCourses(
          metadata.moodleToken as string, 
          metadata.moodleUserId as number
        )
      : [];

    let totalAssignments = 0;
    if (metadata?.moodleToken && courses.length > 0) {
      try {
        const courseIds = courses.map((c: any) => c.id);
        const assignmentsData = await getCourseAssignments(metadata.moodleToken as string, courseIds);
        // returns { courses: [ { assignments: [] }, ... ] }
        totalAssignments = assignmentsData.courses.reduce((acc: number, course: any) => {
          return acc + (course.assignments?.length || 0);
        }, 0);
      } catch (e) {
        console.error("Failed to fetch assignments for summary:", e);
      }
    }

    const userTasks = user 
      ? await db.select().from(tasks).where(eq(tasks.userId, user.id)) 
      : [];

  return (
    <div className="flex justify-around gap-4">
        <div className="flex-1 flex flex-col gap-4 p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-800">
            <span className="font-bold">Total Courses</span>
            <span className="text-white text-2xl">{courses.length}</span>
            <Link className="text-gray-500 text-sm" href="/courses">View all courses &gt;</Link>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-800">
            <span className="font-bold">Total Assignments</span>
            <span className="text-white text-2xl">{totalAssignments}</span>
            <span className="text-gray-500 text-sm italic">Synced from Moodle</span>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-6 border rounded-xl bg-card hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-800">
            <span className="font-bold">Total Tasks</span>
            <span className="text-white text-2xl">{userTasks.length}</span>
            <Link className="text-gray-500 text-sm" href="/">View all tasks &gt;</Link>
        </div>
    </div>
  )
}
export default summary