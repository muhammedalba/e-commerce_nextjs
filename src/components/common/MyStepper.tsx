"use client";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CustomStepIcon from "./CustomStepIcon";
import CustomStepConnector from "./CustomStepConnector";
import Cookies from "js-cookie";

const steps = ["التحقق من البريد", "رمز التحقق", "كلمة المرور الجديدة"];

interface SteppersProps {
  activeStep: number;
}

export default function MyStepper({ activeStep }: SteppersProps) {
  const locale = Cookies.get("NEXT_LOCALE");
  console.log(locale);
  
  const direction = locale === "ar" ? "rtl" : "ltr";
  return (
    <div className="mb-4">
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
                direction: "rtl",
                "& .MuiStepLabel-label": {
                  fontSize: "1.9rem",
                  fontWeight: "bold",
                  color: activeStep >= index ? "#000" : "#999", // أزرق نشط أو رمادي
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "green",
                  fontSize: "3rem", // لون الأيقونة المكتملة
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#1565c0",
                  fontSize: "3rem", // لون الأيقونة النشطة
                },
                "& .MuiStepIcon-root": {
                  color: "#999",
                  fontSize: "3rem", // لون الأيقونة النشطة
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
