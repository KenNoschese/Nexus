"use client";

import { useState } from 'react';
import { tasks, energyLevelEnum } from '@/app/db/schema';
import { updateTask as updateTaskAction } from '@/app/actions';
import { Edit2, Save, X, Clock, Calendar } from 'lucide-react';

type Task = typeof tasks.$inferSelect;
type EnergyLevel = typeof energyLevelEnum.enumValues[number];

export default function UpdateTask({ task }: { task: Task | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Task>>({});

  if (!task) return null;

  const startEditing = () => {
    setEditForm(task);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateTaskAction(task.id, {
        title: editForm.title,
        description: editForm.description,
        energyLevel: editForm.energyLevel as EnergyLevel,
        dueDate: editForm.dueDate ? new Date(editForm.dueDate) : null,
        estimatedDuration: editForm.estimatedDuration ? Number(editForm.estimatedDuration) : null,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end gap-2 -mt-12 mb-6">
          <button 
            onClick={handleSave}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
            title="Save Changes"
          >
            <Save className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsEditing(false)}
            className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Title</label>
          <input 
            type="text"
            value={editForm.title || ''}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="w-full bg-black/40 border border-gray-700 rounded-lg p-2 mt-1 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Energy</label>
            <select 
              value={editForm.energyLevel || 'medium'}
              onChange={(e) => setEditForm({ ...editForm, energyLevel: e.target.value as EnergyLevel })}
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2 mt-1 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {energyLevelEnum.enumValues.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Status</label>
            <div className="flex items-center gap-2 mt-2 bg-black/20 p-2 rounded-lg border border-gray-800/50">
                <span className="capitalize text-gray-200 text-sm font-medium">{task.status}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Description</label>
          <textarea 
            value={editForm.description || ''}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 mt-1 text-white focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
            placeholder="Add task description"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Estimate (mins)</label>
            <input 
              type="number"
              value={editForm.estimatedDuration || ''}
              onChange={(e) => setEditForm({ ...editForm, estimatedDuration: Number(e.target.value) })}
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Due Date</label>
            <input 
              type="date"
              value={editForm.dueDate ? new Date(editForm.dueDate).toISOString().split('T')[0] : ''}
              onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value ? new Date(e.target.value) : null })}
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2 -mt-12 mb-6">
        <button 
          onClick={startEditing}
          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
          title="Edit Task"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Title</label>
          <p className="text-xl font-semibold text-white mt-1 leading-tight">{task.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
          <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Energy</label>
              <div className="flex items-center gap-2 mt-2 bg-black/20 p-2 rounded-lg border border-gray-800/50">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                      task.energyLevel === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                      task.energyLevel === 'medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 
                      task.energyLevel === 'low' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : ''
                  }`}></span>
                  <span className="capitalize text-gray-200 text-sm font-medium">{task.energyLevel}</span>
              </div>
          </div>
          <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Status</label>
              <div className="flex items-center gap-2 mt-2 bg-black/20 p-2 rounded-lg border border-gray-800/50">
                  <span className="capitalize text-gray-200 text-sm font-medium">{task.status}</span>
              </div>
          </div>
      </div>

      <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Description</label>
          {task.description ? (
              <div className="text-gray-300 mt-2 text-sm bg-black/20 p-4 rounded-xl border border-gray-800 leading-relaxed">
                  {task.description}
              </div>
          ) : (
              <p className="text-gray-600 italic text-sm mt-1">No description provided</p>
          )}
      </div>

      <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-gray-800/50 group hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-400">Estimate</span>
              </div>
              <span className="text-sm font-semibold text-white">
                  {task.estimatedDuration ? `${task.estimatedDuration} mins` : '—'}
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
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, {
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
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
      </div>
    </div>
  );
}