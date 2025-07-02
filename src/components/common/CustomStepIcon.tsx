"use client";

import React from "react";
import { motion } from "framer-motion";
import MailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/VpnKey";
import PasswordIcon from "@mui/icons-material/LockReset";
import { StepIconProps } from "@mui/material/StepIcon";

const icons: { [index: string]: React.ReactElement } = {
  1: <MailIcon fontSize="inherit" />,
  2: <CodeIcon fontSize="inherit" />,
  3: <PasswordIcon fontSize="inherit" />,
};

export default function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const isActiveOrCompleted = active || completed;

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: isActiveOrCompleted ? 1.2 : 1 }}
      transition={{ duration: 0.3 }}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: completed
          ? "#4caf50"
          : active
          ? "#1976d2"
          : "#e0e0e0",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        boxShadow: isActiveOrCompleted ? "0 0 8px rgba(0,0,0,0.2)" : "none",
      }}
    >
      {icons[String(icon)]}
    </motion.div>
  );
}
