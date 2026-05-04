
import db from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
import { DialogCreateQRs } from './dialog-create-qrcodes'
import QRCode from 'qrcode';
import { createCanvas } from 'canvas';
import { headers } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import DownloadAll from './downloadAll';
import { DialogUpdateLinkOut } from './dialog-update-linkout';
import { DialogDeleteProject } from './dialog-delete-project';
import ImageClickDonwload from './image-click-download';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async ({ params }: {
    params: Promise<{ project: string }>
}) => {
    const project = await db.projects.findFirst({
        where: { id: (await params).project },
        include: {
            Links: {
                include: {
                    scans: true,
                    _count: { select: { scans: true } }
                }
            }
        }
    })

    if (!project) {
        notFound();
    }
    const currentUrl = (await headers()).get('host');
    console.log('URL:', currentUrl);

    const generateQR = async (code: string) => {
        const url = `https://${currentUrl}${code}`;

        const size = 200;
        const padding = 50;

        const canvas = createCanvas(size, size + padding);
        const context = canvas.getContext('2d');

        await QRCode.toCanvas(canvas, url, {
            margin: 5,
            width: size,
        });

        context.font = 'bold 16px Arial';
        context.textAlign = 'center';
        context.fillStyle = '#000';
        context.fillText(code.split(project.name + '/')[1], size / 2, size - 5);

        return canvas.toDataURL('image/png');
    }





    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className='flex gap-5 items-center'>
                    <Link href="/">
                        <ArrowLeft />
                    </Link>
                    <h1 className='text-2xl font-bold'>{project.name}</h1>
                    <DialogCreateQRs projectId={(await params).project} />

                    <DialogDeleteProject projectId={(await params).project} />
                    <Link href={`/project/${(await params).project}/stats`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        Stats
                    </Link>
                    <DownloadAll links={(await Promise.all(project.Links.map(async link => ({
                        code: link.urlIn,
                        img: await generateQR(link.urlIn)
                    })))
                    )} />
                </div>

                {
                    project.Links.map(async link => (
                        <div key={link.id} className='flex gap-5 items-center'>
                            <p>{link.urlIn}</p>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                {link._count.scans} {link._count.scans === 1 ? 'scan' : 'scans'}
                            </span>
                            <ImageClickDonwload
                                filename={link.urlIn.split(project.name + '/')[1] + ".png"}
                                src={(await generateQR(link.urlIn))}
                                alt={`qrcode-${link.urlIn}`}
                            />
                            {
                                link.urlOut === '/empty' ?
                                    <DialogUpdateLinkOut id={link.id} />
                                    : <DialogUpdateLinkOut id={link.id} link={link.urlOut} />
                            }
                        </div>
                    ))
                }


            </main>
        </div>
    )
}

export default page
