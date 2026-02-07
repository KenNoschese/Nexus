"use client";

import { completeTask } from "@/app/actions";
import { CheckCircle2 } from "lucide-react";

export default function CompleteTaskButton({ taskId, isCompleted }: { taskId: string, isCompleted: boolean }) {
  if (isCompleted) return null;

  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        await completeTask(taskId);
      }}
      className="text-gray-600 hover:text-green-500 hover:cursor-pointer transition-colors p-1"
      title="Complete Task"
    >
      <CheckCircle2 className="w-5 h-5" />
    </button>
  );
}
