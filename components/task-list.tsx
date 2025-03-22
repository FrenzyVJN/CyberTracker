"use client"

import type { Task } from "@/lib/types"
import { TaskCard } from "@/components/task-card"
import { motion, AnimatePresence } from "framer-motion"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggleComplete, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-16 flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center"
      >
        <h3 className="mb-2 text-xl font-medium">No tasks yet</h3>
        <p className="text-muted-foreground">Add a new task to get started.</p>
      </motion.div>
    )
  }

  // Sort tasks by due date and then by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Then sort by due date
    const dateA = new Date(a.dueDate)
    const dateB = new Date(b.dueDate)
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime()
    }

    // Finally sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return (
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
    )
  })

  return (
    <motion.div
      className="mt-6 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

