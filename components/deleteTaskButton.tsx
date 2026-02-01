"use client";

import { deleteTask } from "@/app/actions";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this task?")) {
          await deleteTask(taskId);
        }
      }}
      className="text-gray-600 hover:text-red-500 transition-colors px-2 opacity-0 group-hover:opacity-100"
      title="Delete Task"
    >
      ✕
    </button>
  );
}
