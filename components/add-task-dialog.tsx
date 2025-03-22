"use client"

import type React from "react"

import { useState } from "react"
import type { Task } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { motion } from "framer-motion"

interface AddTaskDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onAddTask: (task: Omit<Task, "id" | "completed">) => void
}

export function AddTaskDialog({ open, setOpen, onAddTask }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [category, setCategory] = useState("core")
  const [priority, setPriority] = useState("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask({
      title,
      description,
      dueDate,
      category,
      priority,
    })
    resetForm()
    setOpen(false)
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDueDate(format(new Date(), "yyyy-MM-dd"))
    setCategory("core")
    setPriority("medium")
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-32px)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="transition-all duration-300 focus:ring-2 focus:ring-primary/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core Subjects</SelectItem>
                  <SelectItem value="hackathons">Hackathons</SelectItem>
                  <SelectItem value="ctfs">CTFs</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label>Priority</Label>
            <RadioGroup value={priority} onValueChange={setPriority} className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-destructive font-medium">
                  High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-amber-400 font-medium">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-green-400 font-medium">
                  Low
                </Label>
              </div>
            </RadioGroup>
          </motion.div>

          <motion.div className="flex justify-end space-x-2 pt-4" variants={itemVariants}>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                setOpen(false)
              }}
              className="transition-all duration-300"
            >
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="bg-gradient-to-r from-primary/80 to-primary transition-all duration-300">
                Add Task
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}

