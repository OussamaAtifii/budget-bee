import useAxios from '@/hooks/useAxios'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'

export function DeleteTransactionModal({ transactionId, onSuccess }) {
  const axios = useAxios()
  const [open, setOpen] = useState(false)

  const handleDeleteTransaction = async () => {
    console.log(`EL ID ES: ${transactionId}`)

    try {
      await axios.delete(`/transaction/${transactionId}`)
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        className="hover:cursor-pointer w-full text-left flex gap-1 items-center"
      >
        <Trash className="size-4" /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <p>This action cannot be undone.</p>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteTransaction()}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
