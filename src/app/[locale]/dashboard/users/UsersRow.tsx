"use client";
import { UserType } from "@/types/users";
import { TableRow, TableCell, tableCellClasses, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconTooltipButton from "../components/IconTooltipButton";
import { useTranslations } from "next-intl";
import Image from "next/image";

// ========== Styled Components ==========
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-white)",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "#e3f2fd",
    cursor: "pointer",
  },
}));

type Props = {
  isLoading?: boolean;
  row: UserType;
  onDelete: () => void;
  onEdit: () => void;
};

export default function UsersRow({ isLoading, row, onDelete, onEdit }: Props) {
  const t = useTranslations("Users");
  return (
    <StyledTableRow>
      <StyledTableCell >
        <Image
          src={row.avatar || "/placeholder.png"}
          alt="avatar"
          width={50}
          height={50}
          style={{ borderRadius: 4, objectFit: "cover" }}
        />
      </StyledTableCell>
      <StyledTableCell onClick={onEdit}>{row.name || "--"}</StyledTableCell>

      <Tooltip
        title={row.email}
        slotProps={{ tooltip: { sx: { fontSize: "1.3rem" } } }}
      >
        <StyledTableCell>{row.email || "--"}</StyledTableCell>
      </Tooltip>

      <StyledTableCell>{row.role || "--"}</StyledTableCell>

      <StyledTableCell>
        <IconTooltipButton
          tooltip={t("deleteLabel")}
          iconClass="fa-solid fa-trash "
          onClick={onDelete}
          disabled={isLoading}
          color="error"
        />
      </StyledTableCell>

      <StyledTableCell>
        <IconTooltipButton
          tooltip={t("editUserTitle")}
          iconClass="fa-regular fa-file-pen "
          onClick={onEdit}
          color="primary"
          disabled={isLoading}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}
