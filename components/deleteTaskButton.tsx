"use client";

import { deleteTask } from "@/app/actions";
import { Trash2 } from "lucide-react";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this task?")) {
          await deleteTask(taskId);
        }
      }}
      className="text-gray-600 hover:text-red-500 hover:cursor-pointer transition-colors px-2"
      title="Delete Task"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
