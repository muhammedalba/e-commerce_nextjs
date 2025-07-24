"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect, useMemo } from "react";
import InputError from "../../components/common/InputError";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";

interface MultipleImageDropzoneProps {
  error?: string;
  onFilesSelect: (files: File[]) => void;
  initialPreviews?: string[];
  label: string;
  removeLabel: string;
}

export default function MultipleImageDropzone({
  error,
  onFilesSelect,
  initialPreviews,
  label,
  removeLabel,
}: MultipleImageDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialPreviews || []);
  console.log("previews", previews);
  console.log("initialPreviews", initialPreviews);
  useEffect(() => {
    if (initialPreviews && initialPreviews.length > 0) {
      setPreviews(initialPreviews);
    }
  }, [initialPreviews]);
  // تحديث المعاينات بناءً على الملفات فقط
  useEffect(() => {
    // تنظيف الروابط القديمة
    previews.forEach((url) => URL.revokeObjectURL(url));

    // إنشاء روابط جديدة من الملفات
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // تنظيف الروابط عند إلغاء التركيب
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
    // نراقب فقط تغير files
  }, [files]);

  // عند رفع ملفات جديدة
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const images = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      if (images.length === 0) return;

      setFiles((currentFiles) => {
        // تجنب تكرار الملفات بنفس الاسم والحجم
        const existingFiles = new Set(currentFiles.map((f) => f.name + f.size));
        const filteredNew = images.filter(
          (file) => !existingFiles.has(file.name + file.size)
        );
        if (filteredNew.length === 0) return currentFiles;

        const updatedFiles = [...currentFiles, ...filteredNew];
        onFilesSelect(updatedFiles);
        return updatedFiles;
      });
    },
    [onFilesSelect]
  );

  // حذف ملف حسب الفهرس
  const handleRemove = useCallback(
    (index: number) => {
      setFiles((currentFiles) => {
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        onFilesSelect(updatedFiles);
        return updatedFiles;
      });
    },
    [onFilesSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });

  // تجنب إعادة رسم الصور إلا عند تغير previews فقط
  const previewsMemo = useMemo(() => {
    if (previews.length === 0) return null;

    return previews.map((src, i) => (
      <div key={i} style={{ position: "relative" }}>
        <Avatar
          src={src}
          alt={`preview-${i}`}
          sx={{
            width: 150,
            height: 150,
            margin: "auto",
            borderRadius: 1,
            bgcolor: "primary",
            fontWeight: "bold",
            objectFit: "cover",
            cursor: "pointer",
          }}
        >
          {/* fallback text if image fails to load */}
          {(label || "--").substring(0, 3).toUpperCase()}
        </Avatar>
        <button
          type="button"
          onClick={() => handleRemove(i)}
          aria-label={removeLabel}
          title={removeLabel}
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            background: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          &times;
        </button>
      </div>
    ));
  }, [previews, handleRemove, removeLabel, initialPreviews]);

  return (
    <motion.div
      className="input-wrapper mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <div
          {...getRootProps()}
          className="mb-4 p-4"
          style={{
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: isDragActive ? "#f5f5f5" : "transparent",
            border: `2px dashed ${error ? "var(--bs-danger)" : "#ccc"}`,
            minHeight: 150,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input {...getInputProps()} />
          {previewsMemo || (
            <p className="m-0" style={{ color: "#555" }}>
              {label}
            </p>
          )}
          <InputError id="images-error" message={error} />
        </div>
      </div>
    </motion.div>
  );
}
