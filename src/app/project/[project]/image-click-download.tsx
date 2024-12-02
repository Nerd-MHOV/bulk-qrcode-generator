'use client';
import Image from 'next/image';
import React from 'react'

const ImageClickDonwload = ( {src, alt, filename}:{
    src: string,
    alt: string,
    filename: string
}) => {
    const downloadQR = (link: string, filename: string) => {
        const a = document.createElement('a');
        a.href = link;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        <Image
            onClick={() => downloadQR(src, filename)}
            src={ src } alt={ alt } width={200} height={200} />
    )
}

export default ImageClickDonwload