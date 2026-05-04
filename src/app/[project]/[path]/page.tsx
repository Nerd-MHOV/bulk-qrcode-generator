import db from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"


type RedirectPageProps = {
    params: Promise<{
        project: string;
        path: string;
    }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const RedirectPage = async ({ params }: RedirectPageProps) => {
    const { project, path } = await params;
    const urlOut = await db.links.findFirst({
        where: {
            urlIn: `/${project}/${path}`
        }
    })

    if (urlOut) {
        await db.scan.create({
            data: { linkId: urlOut.id }
        });
        redirect(urlOut.urlOut);
    }

    notFound();
}

export default RedirectPage
