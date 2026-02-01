
import Taskboard from "../../components/taskboard";
import Addtask from "../../components/addtask";
import Progressbar from "../../components/progressbar";
import LinkedAccount from "../../components/linkedAccount";
import { currentUser } from "@clerk/nextjs/server";
import { getEnrolledCourses } from "../../lib/moodle";


export default async function Home() {
  const user = await currentUser();
  const metadata = user?.privateMetadata;

  const courses = await getEnrolledCourses(
    metadata?.moodleToken as string, 
    metadata?.moodleUserId as number
  );

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-lg">Unified Command Center for Academic Productivity</p>
          <h2 className="text-xl font-semibold mt-4">Welcome back, {user?.firstName}</h2>
        </header>

        
        <Addtask />
        <Progressbar />
        <Taskboard />
        <LinkedAccount />
      </div>
    </main>
  );
}