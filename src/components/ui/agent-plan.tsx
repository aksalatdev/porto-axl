"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, CircleDotDashed } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface Subtask {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  subtasks: Subtask[];
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Chapter 01 — The Beginning",
    status: "completed",
    subtasks: [
      { id: "1.1", title: "Learn to walk before you run", description: "Every master was once a disaster", status: "completed" },
      { id: "1.2", title: "Find wonder in small things", description: "The world is full of magic", status: "completed" },
      { id: "1.3", title: "Dream without limits", description: "Reality can wait", status: "completed" },
    ],
  },
  {
    id: "2",
    title: "Chapter 02 — The Awakening",
    status: "completed",
    subtasks: [
      { id: "2.1", title: "Face the first real struggle", description: "When life hit hard for the first time", status: "completed" },
      { id: "2.2", title: "Discover your calling", description: "When code first felt like magic", status: "completed" },
      { id: "2.3", title: "Accept being misunderstood", description: "Not everyone will get it", status: "completed" },
    ],
  },
  {
    id: "3",
    title: "Chapter 03 — The Present",
    status: "in-progress",
    subtasks: [
      { id: "3.1", title: "Build something meaningful", description: "Create, don't just consume", status: "completed" },
      { id: "3.2", title: "Let go of the past", description: "It's a lesson, not a prison", status: "in-progress" },
      { id: "3.3", title: "Find your people", description: "Those who stay in the storm", status: "in-progress" },
    ],
  },
  {
    id: "4",
    title: "Chapter 04 — The Unknown",
    status: "pending",
    subtasks: [
      { id: "4.1", title: "Heal old wounds", description: "You deserve peace", status: "pending" },
      { id: "4.2", title: "Build a home for your soul", description: "A place to belong", status: "pending" },
      { id: "4.3", title: "Share your light", description: "Happiness multiplies when shared", status: "pending" },
    ],
  },
  {
    id: "5",
    title: "Chapter 05 — ???",
    status: "pending",
    subtasks: [
      { id: "5.1", title: "Leave a mark", description: "Not to be remembered, but to inspire", status: "pending" },
      { id: "5.2", title: "Look back and smile", description: "All scars became stories", status: "pending" },
      { id: "5.3", title: "Rest well", description: "A life fully lived", status: "pending" },
    ],
  },
];

export default function Plan() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [expandedTasks, setExpandedTasks] = useState<string[]>(["3"]);

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]);
  };

  const toggleSubtaskStatus = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return { ...subtask, status: subtask.status === "completed" ? "pending" : "completed" };
            }
            return subtask;
          });
          const allCompleted = updatedSubtasks.every((s) => s.status === "completed");
          return { ...task, subtasks: updatedSubtasks, status: allCompleted ? "completed" : task.status };
        }
        return task;
      })
    );
  };

  return (
    <div className="text-black">
      <LayoutGroup>
        <ul className="space-y-2">
          {tasks.map((task) => {
            const isExpanded = expandedTasks.includes(task.id);
            const isCompleted = task.status === "completed";

            return (
              <motion.li key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-gray-200 pb-2">
                <motion.div 
                  className="flex items-center py-2 cursor-pointer group"
                  onClick={() => toggleTaskExpansion(task.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mr-2 sm:mr-3 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black" />
                    ) : task.status === "in-progress" ? (
                      <CircleDotDashed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-300" />
                    )}
                  </div>
                  <span className={`font-mono text-xs sm:text-sm tracking-wide flex-1 ${isCompleted ? "line-through text-gray-400" : ""}`}>
                    {task.title}
                  </span>
                  <span className="ml-2 text-[10px] sm:text-xs font-mono text-gray-400 uppercase whitespace-nowrap">
                    {task.status}
                  </span>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-5 sm:ml-7 overflow-hidden"
                    >
                      {task.subtasks.map((subtask) => (
                        <motion.li
                          key={subtask.id}
                          className="flex items-start py-1.5 border-l border-gray-200 pl-3 sm:pl-4 group cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); toggleSubtaskStatus(task.id, subtask.id); }}
                          whileHover={{ x: 2 }}
                        >
                          <div className="mr-2 mt-0.5">
                            {subtask.status === "completed" ? (
                              <CheckCircle2 className="h-3 w-3 text-black" />
                            ) : subtask.status === "in-progress" ? (
                              <CircleDotDashed className="h-3 w-3 text-gray-400" />
                            ) : (
                              <Circle className="h-3 w-3 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <p className={`text-[11px] sm:text-xs ${subtask.status === "completed" ? "line-through text-gray-400" : "text-gray-700"}`}>
                              {subtask.title}
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 italic">{subtask.description}</p>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </LayoutGroup>
    </div>
  );
}
