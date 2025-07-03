"use client";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CustomStepIcon from "./CustomStepIcon";
import CustomStepConnector from "./CustomStepConnector";
import { useLocale, useTranslations } from "next-intl"; 

interface SteppersProps {
  activeStep: number;
}

export default function MyStepper({ activeStep }: SteppersProps) {
  const locale = useLocale();
const t = useTranslations("Auth.steps");
  const direction = locale === "ar" ? "rtl" : "ltr";
const steps = [
    t("verifyEmail"),
    t("code"),
    t("newPassword")
  ];
  return (
    <div className="mb-5 ">
      <Stepper
        connector={<CustomStepConnector direction={direction} />}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              slots={{ stepIcon: CustomStepIcon }}
              sx={{
                direction: direction,
                "& .MuiStepLabel-label": {
                  fontSize: "1.9rem",
                  fontWeight: "bold",
                  color: activeStep >= index ? "#000" : "#999",
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "green",
                  fontSize: "3rem",
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#1565c0",
                  fontSize: "3rem",
                },
                "& .MuiStepIcon-root": {
                  color: "#999",
                  fontSize: "3rem",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
