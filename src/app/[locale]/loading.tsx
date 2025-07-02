
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-4"
      >
        <Image
          src="/assets/images/logo/fav.png"
          alt="Loading Logo"
          width={80}
          height={80}
          priority
        />
      </motion.div>

      <motion.h4
        className="fw-bold text-primary mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        جاري تحميل الصفحة
      </motion.h4>

      <motion.div
        className="spinner-border text-primary mt-3"
        role="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="visually-hidden">Loading...</span>
      </motion.div>
    </div>
  );
}
