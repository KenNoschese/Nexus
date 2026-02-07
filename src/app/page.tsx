
import Taskboard from "../../components/taskboard";
import Addtask from "../../components/addtask";
import LinkedAccount from "../../components/linkedAccount";
import { currentUser } from "@clerk/nextjs/server";
import { getEnrolledCourses, logEnrolledCourses, getCourseAssignments } from "../../lib/moodle";
import Summary from "../../components/summary";

export default async function Home() {
  const user = await currentUser();
  const metadata = user?.privateMetadata;

  const courses = (metadata?.moodleToken && metadata?.moodleUserId) 
    ? await getEnrolledCourses(
        metadata.moodleToken as string, 
        metadata.moodleUserId as number
      )
    : [];

  // // Log the raw data to the console so the user can inspect it
  // if (metadata?.moodleToken && metadata?.moodleUserId) {
  //   /*
  //   await logEnrolledCourses(
  //     metadata.moodleToken as string,
  //     metadata.moodleUserId as number
  //   );
  //   */

  //   if (courses.length > 0) {
  //     try {
  //       const courseIds = courses.map((c: any) => c.id);
  //       const assignmentsData = await getCourseAssignments(metadata.moodleToken as string, courseIds);
  //       console.log("--- Nexus Academic Data: Assignments Found ---");
  //       console.dir(assignmentsData, { depth: null });
  //       console.log("----------------------------------------------");
  //     } catch (e) {
  //       console.error("Failed to fetch assignments:", e);
  //     }
  //   }
  // }

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-lg">Unified Command Center for Academic Productivity</p>
          <h2 className="text-xl font-semibold mt-4">Welcome back, {user?.firstName}</h2>
        </header>

        <Summary />
                <Addtask />
                <Taskboard />
                <LinkedAccount isLinked={!!metadata?.moodleLinked} />
              </div>
    </main>
  );
}