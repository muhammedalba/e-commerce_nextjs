"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticIconProps {
  children: React.ReactNode;
}

export default function MagneticIcon({ children }: MagneticIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // نحصل على أبعاد وموقع العنصر
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    // نحسب المسافة بين مؤشر الماوس ومركز العنصر
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // نقوم بتحديث الموقع لجذب العنصر نحو الماوس
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    // نعيد العنصر إلى موقعه الأصلي عند مغادرة الماوس
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}