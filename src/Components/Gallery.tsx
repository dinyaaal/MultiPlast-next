// app/components/Gallery.tsx
"use client";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import Image from "next/image";

interface GalleryProps {
  src: string;
  thumb: string;
}

export default function Gallery({ src, thumb }: GalleryProps) {
  return (
    <LightGallery plugins={[lgZoom]}>
      <a href={src}>
        <Image src={thumb} alt="Image" className="rounded-lg shadow-md" />
      </a>
    </LightGallery>
  );
}
