import Taskboard from "../../components/taskboard";
import Addtask from "../../components/addtask";
import Progressbar from "../../components/progressbar";


export default function Home() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex flex-col md:flex-col items-baseline gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-2">Unified Command Center for Academic Productivity</p>
          </div>
          
        </header>

        <Addtask />

        <Progressbar />

        <Taskboard />
        

      </div>
    </main>
  );
}