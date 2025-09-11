import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export interface LoginModalProps {
  open: boolean
  onClose: () => void
  onLogin: () => void
}

export function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="glass-strong bg-transparent">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>Continue to Weaver</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onLogin}>Sign in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
