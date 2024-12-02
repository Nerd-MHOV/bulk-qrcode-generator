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
import Image from "next/image"
import { createProject } from "./actions"

export function DialogCreateProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Create Project
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Start by creating a new project. You can add a name and description
            to your project.
          </DialogDescription>
        </DialogHeader>
        <Form action={createProject} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2  ">
          <div className="">
            <Input name="name" placeholder="name" required/>
          </div>
          <div className="">
            <Input name="description" placeholder="description" required/>
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
