"use client";

import { deleteTask } from "@/app/actions";
import  { CheckSquare, CheckSquare2 } from "lucide-react";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        await deleteTask(taskId);
        
      }}
      className="text-gray-600 hover:text-green-500 hover:cursor-pointer transition-colors px-2  group-hover:opacity-100"
      title="Delete Task"
    >
      <CheckSquare2 />
    </button>
  );
}
