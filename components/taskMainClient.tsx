'use client';

import { useState } from 'react';
import DeleteTaskButton from "./deleteTaskButton";
import { Clock, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { tasks } from '@/app/db/schema';

type Task = typeof tasks.$inferSelect;

export default function TaskMainClient({ 
  tasksByEnergy 
}: { 
  tasksByEnergy: Record<string, Task[]> 
}) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
        {/* Task List Column */}
        <div className="flex-1 space-y-8">
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
                            onClick={() => setSelectedTask(task)}
                            className={`group border p-4 rounded-xl transition-all cursor-pointer flex justify-between items-start ${
                                selectedTask?.id === task.id 
                                ? 'bg-blue-500/10 border-blue-500/50' 
                                : 'bg-white/5 border-gray-800 hover:border-gray-600'
                            }`}
                            >
                            <div className="flex flex-col">
                                <span className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                                {task.title}
                                </span>
                                <div className="flex items-center gap-3 mt-1">
                                    {task.status !== 'completed' && (
                                        <span className="text-gray-600 group-hover:text-blue-400 text-xs flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> Active
                                        </span>
                                    )}
                                    {task.estimatedDuration && (
                                        <span className="text-gray-600 text-xs flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {task.estimatedDuration}m
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {task.status === 'completed' && (
                                <span className="text-green-500 text-sm"><CheckCircle2 className="w-5 h-5" /></span>
                                )}
                                <DeleteTaskButton taskId={task.id} />
                            </div>
                            </div>
                        ))
                        )}
                    </div>
                </div>
            ))}
        </div>

        {/* Task Details Column */}
        <div className="w-full lg:w-96 bg-white/5 border border-gray-800 p-6 rounded-2xl flex flex-col h-fit sticky top-6 shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
                Task Details
            </h3>
            
            {selectedTask ? (
                <div className="space-y-6">
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Title</label>
                        <p className="text-xl font-semibold text-white mt-1 leading-tight">{selectedTask.title}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Energy</label>
                            <div className="flex items-center gap-2 mt-2 bg-black/20 p-2 rounded-lg border border-gray-800/50">
                                <span className={`w-2.5 h-2.5 rounded-full ${
                                    selectedTask.energyLevel === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                                    selectedTask.energyLevel === 'medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 
                                    selectedTask.energyLevel === 'low' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : ''
                                }`}></span>
                                <span className="capitalize text-gray-200 text-sm font-medium">{selectedTask.energyLevel}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Status</label>
                            <div className="flex items-center gap-2 mt-2 bg-black/20 p-2 rounded-lg border border-gray-800/50">
                                <span className="capitalize text-gray-200 text-sm font-medium">{selectedTask.status}</span>
                            </div>
                        </div>
                    </div>

                    {selectedTask.description && (
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Description</label>
                            <div className="text-gray-300 mt-2 text-sm bg-black/20 p-4 rounded-xl border border-gray-800 leading-relaxed">
                                {selectedTask.description}
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-gray-800/50 group hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-gray-400">Estimate</span>
                            </div>
                            <span className="text-sm font-semibold text-white">
                                {selectedTask.estimatedDuration ? `${selectedTask.estimatedDuration} mins` : '—'}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-gray-800/50 group hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-gray-400">Due Date</span>
                            </div>
                            <span className="text-sm font-semibold text-white">
                                {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : '—'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-800 mt-6 flex justify-between items-center">
                         <span className="text-[10px] text-gray-600 uppercase tracking-widest">Created</span>
                         <span className="text-xs text-gray-500 font-medium">
                            {new Date(selectedTask.createdAt).toLocaleDateString()}
                         </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>Select a task to view details</p>
                </div>
            )}
        </div>
    </div>
  );
}