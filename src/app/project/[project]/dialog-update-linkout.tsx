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
import {  updateQrCodes } from "./actions"

export function DialogUpdateLinkOut({ id, link }: { id: string, link?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={link ? 'secondary' : 'default'}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          
          {
            link || <><Plus /> add link </>
          }
        </Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Update Link out</DialogTitle>
          <DialogDescription>
            Update the link out for your qr.
          </DialogDescription>
        </DialogHeader>
        <Form action={updateQrCodes} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2  ">
            <div className="">
              <Input name="link" placeholder="https://.... http://..." required />
              <input type="hidden" name="id" value={id} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit">
              Update
            </Button>
          </DialogFooter>
        </Form>


      </DialogContent>
    </Dialog>
  )
}
