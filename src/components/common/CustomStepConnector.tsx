"use client";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
interface CustomStepConnectorProps {
  direction: "ltr" | "rtl";
}
const CustomStepConnector = styled(StepConnector)<CustomStepConnectorProps>(({ theme, direction }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
    left: direction === "rtl" ? "calc(50% + 20px)" : "calc(-50% + 24px)",
    right: direction === "rtl" ? "calc(-50% + 24px)" : "calc(50% + 20px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(90deg, #1976d2, #4caf50)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(90deg, #1976d2, #4caf50)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? "#444" : "#ccc",
    borderRadius: 1,
  },
}));

export default CustomStepConnector;
