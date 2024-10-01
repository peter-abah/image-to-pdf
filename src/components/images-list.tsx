import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { PDFImage } from "@/lib/types";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";

interface ImagesListProps {
  images: PDFImage[];
  onAppendImages: (files: File[]) => void;
}
export default function ImagesList({ images, onAppendImages }: ImagesListProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length < 1) return;

    onAppendImages(files);
  };

  return (
    <div className="p-8 justify-center grid grid-cols-[repeat(auto-fit,200px)] gap-6">
      {images.map((image) => (
        <div
          key={image.dataURL}
          className="bg-neutral-50 border rounded-md inline-block p-2 min-w-[200px] relative aspect-square"
        >
          <Image src={image.dataURL} alt="" fill className="object-contain" />
        </div>
      ))}
      <label
        id="add-more"
        className="aspect-square rounded-md bg-neutral-50 hover:bg-neutral-100 border flex flex-col justify-center items-center gap-2 cursor-pointer focus-within:border-neutral-500"
      >
        <ImagePlus size={32} />
        <span className="font-medium text-lg">Add more</span>
        <input
          className="hidden"
          id="add-images"
          type="file"
          onChange={handleFileChange}
          multiple
          accept={ACCEPTED_IMAGE_TYPES.map((s) => `.${s}`).join(",")}
        />
      </label>
    </div>
  );
}
