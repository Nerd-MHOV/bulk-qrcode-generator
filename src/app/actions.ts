'use server'

import db from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {

    const create = await db.projects.create({
        data: {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
        }
    })



    redirect('/project/' + create.id)    
}