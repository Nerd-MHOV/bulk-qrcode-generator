'use server'

import db from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createQrcodes(formData: FormData) {
    const amount = formData.get('amount') as string
    const projectId = formData.get('projectId') as string
    const project = await db.projects.findFirst({ where: { id: projectId } })
    await db.links.createMany({
        data: Array.from({ length: Number(amount) }).map(() => ({
            projectId,
            urlIn: `/${project?.name}/${Math.random().toString(36).substring(7)}`,
            urlOut: '/empty',
        }))
    })


    revalidatePath('/project/' + projectId)
    redirect('/project/' + projectId)
}

export async function updateQrCodes(formData: FormData) {
    console.log('formData:', formData)
    try {
        const update = await db.links.update({
            where: { id: formData.get('id') as string },
            data: {
                urlOut: formData.get('link') as string
            }
        })
        revalidatePath('/project/' + update.projectId)
        redirect('/project/' + update.projectId)

    } catch (error) {
        console.error('Error:', error)
    }


}