"use client";

import ImagesInput from "@/components/images-input";
import ImagesList from "@/components/images-list";
import { PDFImage } from "@/lib/types";
import { transformFiles } from "@/lib/utils";
import jsPDF, { ImageFormat } from "jspdf";
import { useState } from "react";

const getImageOptions = (image: PDFImage, pageSize: { w: number; h: number }) => {
  const pageAspectRatio = pageSize.w / pageSize.h;
  const imageAspectRatio = image.width / image.height;

  let dimension: { x: number; y: number; width: number; height: number };

  if (imageAspectRatio > pageAspectRatio) {
    const height = pageSize.w / imageAspectRatio;
    dimension = { x: 0, y: (pageSize.h - height) / 2, width: pageSize.w, height: height };
  } else {
    const width = pageSize.h * imageAspectRatio;
    dimension = { x: (pageSize.w - width) / 2, y: 0, width: width, height: pageSize.h };
  }

  return {
    imageData: image.dataURL,
    format: image.file.type.split("/")[1] as ImageFormat,
    ...dimension,
  };
};

const generatePDF = (images: PDFImage[]) => {
  const doc = new jsPDF({ compress: true });
  const pageSize = doc.internal.pageSize;
  images.forEach((image, index) => {
    doc.addImage(getImageOptions(image, { w: pageSize.getWidth(), h: pageSize.getHeight() }));
    if (index < images.length - 1) {
      doc.addPage();
    }
  });
  doc.save("file.pdf");
};

export default function Home() {
  const [images, setImages] = useState<PDFImage[]>([]);

  const handleImagesChange = async (files: File[]) => {
    setImages(await transformFiles(files));
  };

  const handleAppendImages = async (files: File[]) => {
    const transformed = await transformFiles(files);
    setImages((prev) => [...prev, ...transformed]);
  };

  return (
    <main>
      {images.length > 0 ? (
        <div>
          <ImagesList images={images} onAppendImages={handleAppendImages} />
          <button
            type="button"
            onClick={() => generatePDF(images)}
            className="fixed py-4 px-6 bg-primary text-primary-foreground rounded-full shadow bottom-4 right-4 hover:bg-primary/80"
          >
            Generate PDF
          </button>
        </div>
      ) : (
        <ImagesInput onImagesChange={handleImagesChange} />
      )}
    </main>
  );
}
