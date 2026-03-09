'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { deleteProject } from "./actions"

export function DialogDeleteProject({ projectId }: { projectId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All QR codes associated with this project will also be deleted.
          </DialogDescription>
        </DialogHeader>
        <form action={deleteProject}>
          <input type="hidden" name="projectId" value={projectId} />
          <DialogFooter className="sm:justify-start">
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
