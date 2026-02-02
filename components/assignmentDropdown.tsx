'use client';

import { useState } from 'react';

export default function AssignmentDropdown({ course }: { course: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-white/5 transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
      >
        <span className="font-semibold text-blue-400">{course.fullname}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full border border-blue-500/20">
            {course.assignments.length} pending
          </span>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="border-t border-gray-800 bg-black/20">
          {course.assignments.map((assignment: any) => (
            <div key={assignment.id} className="p-4 border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h5 className="font-medium text-gray-200 text-sm">{assignment.name}</h5>
                  {assignment.intro && (
                    <div 
                        className="text-xs text-gray-500 mt-1 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: assignment.intro }} 
                    />
                  )}
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400">Due</span>
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                        {new Date(assignment.duedate * 1000).toLocaleDateString()}
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}