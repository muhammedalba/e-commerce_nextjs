import React from "react";
import { IconButton, Tooltip } from "@mui/material";

interface IconTooltipButtonProps {
  tooltip: string;
  disabled?: boolean;
  iconClass: string;
  onClick?: () => void;
  href?: string;
  color?:
    | "primary"
    | "secondary"
    | "default"
    | "inherit"
    | "error"
    | "info"
    | "success"
    | "warning";
  tooltipSx?: object;
  buttonProps?: React.ComponentProps<typeof IconButton>;
}

const IconTooltipButton: React.FC<IconTooltipButtonProps> = ({
  tooltip,
  iconClass,
  onClick,
  disabled,
  href,
  color = "primary",
  tooltipSx = { fontSize: "1.3rem", p: 1 },
  buttonProps = {},
}) => {
  const isLink = !!href;

  return (
    <Tooltip title={tooltip} slotProps={{ tooltip: { sx: tooltipSx } }}>
      <IconButton
        className="text-decoration-none"
        color={color}
        onClick={onClick}
        component={isLink ? "a" : "button"}
        {...(isLink ? { href } : {})}
        disabled={disabled}
        aria-label={tooltip}
        {...buttonProps}
      >
        <i className={`${iconClass} fs-2`} />
      </IconButton>
    </Tooltip>
  );
};

export default IconTooltipButton;
