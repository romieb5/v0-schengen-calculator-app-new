"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface AccountDeletedModalProps {
  open: boolean
  onClose: () => void
}

export function AccountDeletedModal({ open, onClose }: AccountDeletedModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl sm:text-2xl">Account deleted</DialogTitle>
          <DialogDescription className="text-sm sm:text-base pt-2">
            Your account and all associated data have been permanently removed. You can continue using the calculator as a guest with local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-2">
          <Button onClick={onClose} className="font-semibold px-8">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
