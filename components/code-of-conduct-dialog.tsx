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
          <DialogTitle className="text-xl font-bold">Class Task Manager Code of Conduct</DialogTitle>
          <DialogDescription>
            Please read and accept our code of conduct before using the Task Manager.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 h-[300px] pr-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-medium">Purpose</h3>
            <p>
              The Class Task Manager is designed to help students organize their academic responsibilities. 
              By using this platform, you agree to abide by the following guidelines.
            </p>
            
            <h3 className="font-medium">Academic Integrity</h3>
            <p>
              This tool is intended to help manage your academic workload. It should not be used to 
              circumvent academic integrity policies of your institution. Users are expected to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Complete their own work and assignments</li>
              <li>Use the task manager for legitimate academic planning</li>
              <li>Not share access to facilitate academic dishonesty</li>
            </ul>
            
            <h3 className="font-medium">Respectful Use</h3>
            <p>
              When using shared features or collaborative aspects of the platform:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use appropriate and respectful language in task descriptions</li>
              <li>Respect the privacy of other users</li>
              <li>Do not enter content that could be considered harmful, offensive, or inappropriate</li>
            </ul>
            
            <h3 className="font-medium">Data Privacy</h3>
            <p>
              By using this application, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your task data is stored locally on your device</li>
              <li>Email addresses provided for notifications will only be used for the stated purpose</li>
              <li>We do not share your personal information with third parties</li>
            </ul>
            
            <h3 className="font-medium">System Usage</h3>
            <p>
              To ensure a positive experience for all users:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Do not attempt to disrupt the service or exploit vulnerabilities</li>
              <li>Report any bugs or issues to the system administrator</li>
              <li>Do not use automated scripts or bots to interact with the platform</li>
            </ul>
            
            <h3 className="font-medium">Violation Consequences</h3>
            <p>
              Violations of this code of conduct may result in:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Temporary or permanent loss of access to the Task Manager</li>
              <li>Reporting to institutional authorities if applicable</li>
              <li>Other actions as deemed appropriate by administrators</li>
            </ul>
            
            <p className="pt-4">
              By clicking "I Accept" below, you agree to abide by this Code of Conduct while using the 
              Class Task Manager.
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