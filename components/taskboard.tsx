import { db } from "@/app/db";
import { tasks } from "@/app/db/schema";

export default async function Taskboard() {
  const allTasks = await db.select().from(tasks);

  const tasksByEnergy = {
    high: allTasks.filter(t => t.energyLevel === 'high'),
    medium: allTasks.filter(t => t.energyLevel === 'medium'),
    low: allTasks.filter(t => t.energyLevel === 'low'),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {(['high', 'medium', 'low'] as const).map((level) => (
        <div key={level} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-3 h-3 rounded-full ${
              level === 'high' ? 'bg-red-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}></span>
            <h3 className="text-lg font-bold capitalize text-gray-300">{level} Energy Tasks</h3>
            <span className="ml-auto text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
              {tasksByEnergy[level].length}
            </span>
          </div>
          
          <div className="space-y-3">
            {tasksByEnergy[level].length === 0 ? (
              <p className="text-sm text-gray-600 italic p-4 border border-dashed border-gray-800 rounded-xl">
                No {level} energy tasks...
              </p>
            ) : (
              tasksByEnergy[level].map((task) => (
                <div 
                  key={task.id} 
                  className="group bg-white/5 border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                      {task.title}
                    </span>
                    {task.status === 'completed' ? (
                      <span className="text-green-500 text-sm">✓</span>
                    ) : (
                      <span className="text-gray-600 group-hover:text-blue-400 text-xs">Active</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}