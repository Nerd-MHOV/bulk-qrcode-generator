import { Button } from "@/components/ui/button"
import Form from "next/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { createQrcodes } from "./actions"

export function DialogCreateQRs({ projectId }: { projectId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Plus />
          QRs
        </Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Create QRs</DialogTitle>
          <DialogDescription>
            Generate QR codes for your project. You can add how many QR codes you want to generate.
          </DialogDescription>
        </DialogHeader>
        <Form action={createQrcodes} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2  ">
            <div className="">
              <Input name="amount" placeholder="amount" required type="number" />
              <input type="hidden" name="projectId" value={projectId} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit">
              Create
            </Button>
          </DialogFooter>
        </Form>


      </DialogContent>
    </Dialog>
  )
}
