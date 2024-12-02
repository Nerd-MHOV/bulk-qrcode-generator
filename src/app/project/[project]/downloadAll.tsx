'use client'
import JSZip from 'jszip';
import React from 'react'
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DownloadAll = ({ links }: {
    links: {
        code: string;
        img: string;
    }[],
}) => {


    
    const downloadAllQRs = async (links: {
        code: string;
        img: string;
    }[]) => {
        const zip = new JSZip();

        links.forEach(async link => {
            const qrCodeDataUrl = link.img
            const imgData = qrCodeDataUrl.split(',')[1];
            zip.file(`${link.code}.png`, imgData, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'qrcodes.zip');
    }

    return (
        <Button
            variant={'secondary'}
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            onClick={() => downloadAllQRs(links)}
        >
            <Download />
            Download All QRs
        </Button>
    )
}

export default DownloadAll