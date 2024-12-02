import db from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"

const RedirectPage = async ({ params }: {
    params: {
        project: string,
        path: string
    }
}) => {
    const urlOut = await db.links.findFirst({
        where: {
            urlIn: `/${params.project}/${params.path}`
        }
    })

    if (urlOut) {
        redirect('https://google.com')
    }

    notFound();
}

export default RedirectPage