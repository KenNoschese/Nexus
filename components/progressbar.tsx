import { db } from "@/app/db";
import { tasks } from "@/app/db/schema";

async function progressbar() {
    const allTasks = await db.select().from(tasks);
      
      const completedCount = allTasks.filter(t => t.status === 'completed').length;
      const totalCount = allTasks.length;
      const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white/5 border border-gray-800 p-4 rounded-2xl md:w-full">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-200">Total Progress</span>
              <span className="text-l font-bold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
        <p className="text-xs text-gray-500 mt-2">{completedCount} of {totalCount} tasks completed</p>
    </div>
  )
}
export default progressbar