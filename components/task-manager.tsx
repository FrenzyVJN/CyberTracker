"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle, Bell } from "lucide-react"
import type { Task } from "@/lib/types"
import { createPocketBase } from "@/lib/pb"
import { NotificationDialog } from "@/components/notification-dialog" 
import { CodeOfConductDialog } from "@/components/code-of-conduct-dialog" // Import the new component

// Initialize PocketBase client

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [codeOfConductOpen, setCodeOfConductOpen] = useState(false)

  // Check if code of conduct has been shown before
  useEffect(() => {
    const hasSeenCodeOfConduct = localStorage.getItem("hasSeenCodeOfConduct")
    if (!hasSeenCodeOfConduct) {
      setCodeOfConductOpen(true)
    }
  }, [])

  // Fetch tasks from PocketBase on initial render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const pb = createPocketBase()
        const records = await pb.collection("task_tracker").getFullList()  // Assuming "tasks" is the name of the collection
        const fetchedTasks = records.map((record) => ({
          id: record.id,
          title: record.title,
          description: record.description,
          dueDate: record.due_date,
          category: record.category,
          priority: record.priority,
          completed: false,  // Set completed to false by default
        }))
        console.log("Fetched tasks:", fetchedTasks)
        setTasks(fetchedTasks)

        // Save to localStorage
        localStorage.setItem("studentTasks", JSON.stringify(fetchedTasks))
      } catch (error) {
        console.error("Error fetching tasks from PocketBase:", error)
        // Optionally, you can use the hardcoded tasks as a fallback
        const savedTasks = localStorage.getItem("studentTasks")
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks))
        }
      }
    }

    fetchTasks()
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
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    // Save updated tasks to localStorage
    localStorage.setItem("studentTasks", JSON.stringify(updatedTasks))
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
    // Save updated tasks to localStorage
    localStorage.setItem("studentTasks", JSON.stringify(updatedTasks))
  }

  const handleNotifyClick = () => {
    setNotifyOpen(true)
  }

  const handleSetupNotifications = (email: string) => {
    // Save email to localStorage
    localStorage.setItem("notificationEmail", email)
    console.log(`Notification setup for email: ${email}`)
    // Here you would typically set up your actual notification system
  }

  const handleAcceptCodeOfConduct = () => {
    localStorage.setItem("hasSeenCodeOfConduct", "true")
    setCodeOfConductOpen(false)
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Class Task Manager</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={handleNotifyClick} variant="outline" className="gap-2 w-full sm:w-auto">
            <Bell className="h-4 w-4" />
            Notify Me
          </Button>
          <Button onClick={() => setAddTaskOpen(true)} className="gap-2 w-full sm:w-auto">
            <PlusCircle className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="core">Core Subjects</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="ctfs">CTFs</TabsTrigger>
          <TabsTrigger value="projects">NPTEL</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
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
        <TabsContent value="exams">
          <TaskList
            tasks={tasks.filter((task) => task.category === "exams")}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        </TabsContent>
      </Tabs>

      <AddTaskDialog open={addTaskOpen} setOpen={setAddTaskOpen} onAddTask={addTask} />
      <NotificationDialog 
        open={notifyOpen} 
        setOpen={setNotifyOpen} 
        onSetupNotifications={handleSetupNotifications} 
      />
      <CodeOfConductDialog
        open={codeOfConductOpen}
        setOpen={setCodeOfConductOpen}
        onAccept={handleAcceptCodeOfConduct}
      />
    </div>
  )
}