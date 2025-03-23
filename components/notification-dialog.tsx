import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z } from "zod" // Assuming you have zod for validation
import { createPocketBase } from "@/lib/pb"
interface NotificationDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSetupNotifications: (email: string) => void
}

export function NotificationDialog({ 
  open, 
  setOpen, 
  onSetupNotifications 
}: NotificationDialogProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    setIsSubmitting(true)
    e.preventDefault()
    const pb = createPocketBase();
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address")
      return
    }
    const record = await pb.collection("notfication_emails").create({"emails":email,})
    onSetupNotifications(email)
    setOpen(false)
    setEmail("")
    setError("")
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Up Notifications</DialogTitle>
          <DialogDescription>
            Enter your email to receive notifications about upcoming tasks and deadlines.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isSubmitting? "Saving..." : "Save Preferences"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}