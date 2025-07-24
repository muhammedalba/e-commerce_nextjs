"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

interface BdfUploaderProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
  removeLabel?: string;
  error?: string;
}

export default function BdfUploader({
  onFileSelect,
  label = "قم بسحب ملف .bdf هنا أو انقر للاختيار",
  removeLabel = "حذف الملف",
  error,
}: BdfUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      const isBdf = file.name.toLowerCase().endsWith(".bdf");

      if (!isBdf) {
        setLocalError("الملف غير مدعوم، الرجاء رفع ملف بامتداد .bdf فقط.");
        setFileName(null);
        onFileSelect(null);
        return;
      }

      setLocalError(null);
      setFileName(file.name);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    // accept غير مستخدم لأن ملفات bdf ليس لها type
  });

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
          className="mb-2 p-4"
          style={{
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: isDragActive ? "#f5f5f5" : "transparent",
            border: `2px dashed ${error || localError ? "var(--bs-danger)" : "#ccc"}`,
          }}
        >
          <input {...getInputProps()} />
          <p className="m-0" style={{ color: "#555" }}>
            {label}
          </p>
        </div>

        {/* ✅ عرض اسم الملف أو الخطأ */}
        {(localError || error || fileName) && (
          <p className={`mt-2 fw-semibold ${localError || error ? "text-danger" : "text-muted"}`}>
            {localError || error || fileName}
          </p>
        )}

        {fileName && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger d-block mx-auto my-3 py-2"
            title={removeLabel}
            aria-label={removeLabel}
            onClick={() => {
              setFileName(null);
              setLocalError(null);
              onFileSelect(null);
            }}
          >
            <i className="fa-solid fa-trash-check me-2"></i> {removeLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}
