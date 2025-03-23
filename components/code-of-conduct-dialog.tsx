import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CodeOfConductDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onAccept: () => void
}

export function CodeOfConductDialog({ 
  open, 
  setOpen, 
  onAccept 
}: CodeOfConductDialogProps) {
  
  const handleAccept = () => {
    onAccept()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Cybersecurity Class Task Manager Guidelines</DialogTitle>
          <DialogDescription>
            Please read and accept these guidelines before using the Task Manager.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 h-[300px] pr-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-medium">Purpose</h3>
            <p>
              This Task Manager is designed exclusively for cybersecurity students to track class assignments and deadlines.
              It's meant to be a simple tool to help us not forget important class tasks.
            </p>
            
            <h3 className="font-medium">Keep It In-House</h3>
            <p>
              This tool is for our cybersecurity class only. Please do not share access with anyone outside our class.
              Sharing could lead to the tool being taken down.
            </p>
            
            <h3 className="font-medium">Security Notice</h3>
            <p>
              This website intentionally has minimal security measures as it's designed purely as a convenience tool.
              Please do not attempt to exploit vulnerabilities - if exploited, we'll have to take it down completely.
            </p>
            
            <h3 className="font-medium">Notification Feature</h3>
            <p>
              The "Notify Me" button should only be used if you're prepared to receive an email notification 
              every time a new task is added. Please use this feature responsibly.
            </p>
            
            <h3 className="font-medium">Respectful Use</h3>
            <p>
              When adding tasks or comments:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keep content relevant to our cybersecurity class</li>
              <li>Use appropriate language in task descriptions</li>
              <li>Respect the shared nature of this tool</li>
            </ul>
            
            <h3 className="font-medium">Data Storage</h3>
            <p>
              Be aware that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Task data is stored with minimal protection</li>
              <li>Email addresses for notifications are stored in plain text</li>
              <li>Don't enter sensitive personal information</li>
            </ul>
            
            <p className="pt-4">
              By clicking "I Accept" below, you agree to use this Task Manager responsibly and keep it within our cybersecurity class.
            </p>
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-6">
          <Button onClick={handleAccept} className="w-full">I Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}