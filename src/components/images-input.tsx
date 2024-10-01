"use client";

import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";

interface ImagesInputProps {
  onImagesChange: (images: File[]) => void;
}
export default function ImagesInput({ onImagesChange }: ImagesInputProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length < 1) return;

    onImagesChange(files);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer?.files || []).filter((f) =>
      ACCEPTED_IMAGE_TYPES.some((type) => f.type.endsWith(type))
    );

    if (files.length < 1) {
      return;
    }
    onImagesChange(files);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-4">
      <div className="max-w-[600px] mx-auto text-center space-y-4">
        <h2 className="font-semibold text-xl">Upload Your Images to Create a PDF</h2>
        <p className="text-lg">
          Drag and drop your images below or click to upload. You can reorder, preview, and edit
          images before generating your PDF.
        </p>
      </div>

      <div>
        <label
          htmlFor="select-image"
          className={cn(
            "cursor-pointer hover:bg-primary-foreground border-2 border-dashed p-6 rounded-xl w-full max-w-[400px] aspect-[2/1] flex flex-col gap-4 items-center justify-center focus-within:border-black",
            { "bg-primary-foreground": isDragOver }
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <input
            className="sr-only"
            id="select-image"
            type="file"
            onChange={handleFileChange}
            multiple
            accept={ACCEPTED_IMAGE_TYPES.map((s) => `.${s}`).join(",")}
          />
          <ImageUp width={50} height={50} />
          <p className="text-center font-medium">
            Drag & drop images here or click to select images.{" "}
            <span className="opacity-80">({ACCEPTED_IMAGE_TYPES.join(", ")})</span>
          </p>
        </label>
      </div>
    </div>
  );
}
