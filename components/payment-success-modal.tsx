"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PaymentSuccessModalProps {
  open: boolean
  onClose: () => void
  hasStays: boolean
}

export function PaymentSuccessModal({ open, onClose, hasStays }: PaymentSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl sm:text-2xl">You&apos;re all set!</DialogTitle>
          <DialogDescription className="text-sm sm:text-base pt-2">
            {hasStays
              ? "Your timeline is now unlocked and your recorded stays have been imported. You can view your complete Schengen travel history below."
              : "Your timeline is now unlocked. Start recording your Schengen area visits and your personalized timeline will build out automatically."}
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
