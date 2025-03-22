"use client"

import { useState } from "react"
import { format } from "date-fns"
import type { Task } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-success text-success-foreground",
  }

  const categoryLabels = {
    core: "Core Subject",
    hackathons: "Hackathon",
    ctfs: "CTF",
    projects: "Project",
  }

  const dueDate = new Date(task.dueDate)
  const isOverdue = !task.completed && dueDate < new Date()

  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "transition-all duration-300 relative overflow-hidden",
          task.completed ? "opacity-60" : "",
          isOverdue ? "border-destructive" : "",
          isHovered ? "shadow-lg" : "shadow-sm",
        )}
      >
        {/* Fancy gradient background effect */}
        <div
          className={cn(
            "absolute inset-0 opacity-10 bg-gradient-to-r",
            task.priority === "high"
              ? "from-red-900 to-red-600"
              : task.priority === "medium"
                ? "from-amber-900 to-amber-600"
                : "from-green-900 to-green-600",
          )}
        />

        <CardContent className="p-4 relative z-10">
          <div className="flex items-start gap-3">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task.id)}
                className={cn("mt-1 transition-all duration-300", task.completed ? "bg-primary border-primary" : "")}
              />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3
                  className={cn(
                    "text-lg font-medium transition-all duration-300",
                    task.completed ? "line-through text-muted-foreground" : "",
                  )}
                >
                  {task.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      priorityColors[task.priority as keyof typeof priorityColors],
                      "transition-all duration-300",
                    )}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  <Badge variant="secondary">{categoryLabels[task.category as keyof typeof categoryLabels]}</Badge>
                </div>
              </div>

              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span className={cn(isOverdue ? "text-destructive font-medium" : "")}>
                  {format(dueDate, "MMM d, yyyy")}
                  {isOverdue && " (Overdue)"}
                </span>
              </div>

              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-sm"
                >
                  <p>{task.description}</p>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-2 pt-0 relative z-10">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-xs">
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-3 w-3" /> Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-3 w-3" /> Show Details
              </>
            )}
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive text-xs hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="mr-1 h-3 w-3" /> Delete
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

