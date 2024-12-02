import db from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"


type RedirectPageProps = {
    params: Promise<{
        project: string;
        path: string;
    }>;
};

const RedirectPage = async ({ params }: RedirectPageProps) => {
    const { project, path } = await params;
    const urlOut = await db.links.findFirst({
        where: {
            urlIn: `/${project}/${path}`
        }
    })

    if (urlOut) {
        redirect('https://google.com')
    }

    notFound();
}

export default RedirectPage