import { SupplierType } from "@/types/supplier";
import {
  TableRow,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

import IconTooltipButton from "../components/IconTooltipButton";

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
  row: SupplierType;
  onDelete: () => void;
  onEdit: () => void;
  t: (key: string) => string;
};

export default function SupplierRow({isLoading, row, onDelete, onEdit, t }: Props) {
  return (
    <StyledTableRow>
      <StyledTableCell onClick={onEdit}>
        <Image
          src={row.avatar || "/placeholder.png"}
          alt="avatar"
          width={50}
          height={50}
          style={{ borderRadius: 4, objectFit: "cover" }}
        />
      </StyledTableCell>

      <StyledTableCell>{row.name || "--"}</StyledTableCell>
      <StyledTableCell>{row.contactName || "--"}</StyledTableCell>
      <StyledTableCell>{row.address || "--"}</StyledTableCell>

      <StyledTableCell>{row.email || "--"}</StyledTableCell>

      <StyledTableCell>
        <IconTooltipButton
          tooltip={t("callWithePhone")}
          iconClass="fa-light fa-phone-arrow-up-right"
          href={`tel:${row.phone}`}
        />
      </StyledTableCell>
      <StyledTableCell
        sx={{ color: row.status === "active" ? "green" : "red" }}
      >
        {row.status || "--"}
      </StyledTableCell>
      <StyledTableCell>
        {row.website ? (
          <IconTooltipButton
            tooltip={t("TableRowData.website")}
            iconClass="fa-solid fa-globe"
            href={row.website}
          />
        ) : (
          "--"
        )}
      </StyledTableCell>

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
          tooltip={t("editSupplierTitle")}
          iconClass="fa-regular fa-file-pen "
          onClick={onEdit}
          color="primary"
          disabled={isLoading}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}
