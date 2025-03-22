"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { Task } from "@/lib/types"

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete Math Assignment",
    description: "Chapter 5 problems 1-20",
    dueDate: "2025-03-25",
    category: "core",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Physics Lab Report",
    description: "Write up results from the pendulum experiment",
    dueDate: "2025-03-28",
    category: "core",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Web Dev Hackathon",
    description: "24-hour coding challenge at the student center",
    dueDate: "2025-04-05",
    category: "hackathons",
    priority: "high",
    completed: false,
  },
  {
    id: "4",
    title: "PicoCTF Challenge",
    description: "Complete at least 5 challenges",
    dueDate: "2025-03-30",
    category: "ctfs",
    priority: "medium",
    completed: false,
  },
  {
    id: "5",
    title: "Group Project Meeting",
    description: "Discuss progress on the semester project",
    dueDate: "2025-03-24",
    category: "projects",
    priority: "high",
    completed: false,
  },
]

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [open, setOpen] = useState(false)

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("studentTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(initialTasks)
      localStorage.setItem("studentTasks", JSON.stringify(initialTasks))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("studentTasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Class Task Manager</h1>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="core">Core Subjects</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="ctfs">CTFs</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="core">
          <TaskList
            tasks={tasks.filter((task) => task.category === "core")}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        </TabsContent>
        <TabsContent value="hackathons">
          <TaskList
            tasks={tasks.filter((task) => task.category === "hackathons")}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        </TabsContent>
        <TabsContent value="ctfs">
          <TaskList
            tasks={tasks.filter((task) => task.category === "ctfs")}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        </TabsContent>
        <TabsContent value="projects">
          <TaskList
            tasks={tasks.filter((task) => task.category === "projects")}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        </TabsContent>
      </Tabs>

      <AddTaskDialog open={open} setOpen={setOpen} onAddTask={addTask} />
    </div>
  )
}

