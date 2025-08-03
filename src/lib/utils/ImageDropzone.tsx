"use client";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import InputError from "../../components/common/InputError";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";

interface ImageDropzoneProps {
  error?: string;
  onFileSelect: (file: File | null) => void;
  preview: string | null;
  setPreview: (url: string | null) => void;
  label: string;
  removeLabel: string;
}

export default function ImageDropzone({
  error,
  onFileSelect,
  preview,
  setPreview,
  label,
  removeLabel,
}: ImageDropzoneProps) {
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = useCallback(
    (file: File) => {
      onFileSelect(file);
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    },
    [onFileSelect, setPreview]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("image/")) {
        handleAvatarChange(file);
      }
    },
    [handleAvatarChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  return (
    <motion.div
      className="input-wrapper mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex gap-3 align-items-center mb-4 mt-5">
        <i className={`text-primary fa-solid fa-pencil fs-3 `} />
        <label className="m-0" htmlFor={"imageUpload"}>
          {label}
        </label>
      </div>
      <div className="text-center">
        <div
          {...getRootProps()}
          className="mb-4 p-4"
          style={{
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: isDragActive ? "#f5f5f5" : "transparent",
            border: `2px dashed ${error ? "var(--bs-danger)" : "#ccc"}`,
          }}
        >
          <input {...getInputProps()} id="imageUpload" />
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : preview ? (
            <Avatar
              src={preview || undefined}
              alt={label || "image"}
              sx={{
                width: 300,
                height: 150,
                margin: "auto",
                borderRadius: 1,
                bgcolor: "primary",
                fontWeight: "bold",
              }}
            >
              {/* fallback text if image fails to load */}
              {(label || "--").substring(0, 3).toUpperCase()}
            </Avatar>
          ) : (
            <p className="m-0" style={{ color: "#555" }}>
              {label}
            </p>
          )}
          <InputError id="avatar-error" message={error} />
        </div>

        {preview && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger d-block mx-auto my-3 py-3"
            title={removeLabel}
            aria-label={removeLabel}
            onClick={() => {
              setPreview(null);
              onFileSelect(null);
            }}
          >
            <i className="fa-solid fa-trash-check fa-2xl"></i>
          </button>
        )}
      </div>
    </motion.div>
  );
}
