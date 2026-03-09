import { FlaskConicalOff } from "lucide-react";
import { DialogCreateProject } from "./dialog-create-project";
import db from "@/lib/prisma";

export default async function Home() {
  const projects = await db.projects.findMany();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>BULK QR GENERATOR</h1>
        <h1>Your Projects:</h1>

        {projects.length ? (
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {projects.map((project) => (
              <a key={project.id} href={`/project/${project.id}`}>
                <li className="mb-2 hover:underline hover:underline-offset-4">
                  {project.name}
                </li>
              </a>
            ))}
          </ol>
        ) : (
          <div className="flex gap-2 text-red-400">
            <FlaskConicalOff />
            <p>you dont have anyone project</p>
          </div>
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <DialogCreateProject />
        </div>
      </main>
    </div>
  );
}
