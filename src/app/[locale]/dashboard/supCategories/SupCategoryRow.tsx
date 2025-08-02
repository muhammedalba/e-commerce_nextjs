import { SupCategoryType } from "@/types";
import {
  TableRow,
  IconButton,
  Tooltip,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import IconTooltipButton from "../components/IconTooltipButton";

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
  row: SupCategoryType;
  onDelete: () => void;
  onEdit: () => void;
  t: (key: string) => string;
  isLoading?: boolean;
};

export default function SupCategoryRow({ row, onDelete, onEdit, t, isLoading }: Props) {
  return (
    <StyledTableRow>
      <StyledTableCell>{row.name || "--"}</StyledTableCell>

      <StyledTableCell>{row.category?.name || "--"}</StyledTableCell>

      <StyledTableCell onClick={onEdit}>
        <Image
          src={row.category?.image || "/placeholder.png"}
          alt={row.category?.name || "product"}
          width={50}
          height={50}
          style={{ borderRadius: 4 }}
        />
      </StyledTableCell>
      <StyledTableCell>
        <IconTooltipButton
          tooltip={t("deleteLabel")}
          iconClass="fa-solid fa-trash-xmark fs-3"
          onClick={onDelete}
          color="error"
          disabled={isLoading}
        />
      </StyledTableCell>

      <StyledTableCell>
        <IconTooltipButton
          tooltip={t("editSupCategory")}
          iconClass="fa-regular fa-file-pen fs-3"
          onClick={onEdit}
          color="primary"
          disabled={isLoading}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}
