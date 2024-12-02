import { FlaskConicalOff } from "lucide-react";
import Image from "next/image";
import { DialogCreateProject } from "./dialog-create-project";
import db from "@/lib/prisma";

export default async function Home() {
  const projects = await db.projects.findMany();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1>BEST BULK QR GENERATOR --|-- CHARUTAR</h1>
        <h1>Your Projects:</h1>




        {
          projects.length ?

            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              {projects.map((project) =>
                <a key={project.id} href={`/project/${project.id}`}>
                  <li className="mb-2 hover:underline hover:underline-offset-4">
                    {project.name}
                  </li>
                </a>
              )}
            </ol>

            : (

              <div className="flex gap-2 text-red-400">
                <FlaskConicalOff />
                <p>you dont have anyone project</p>

              </div>

            )
        }

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <DialogCreateProject />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
