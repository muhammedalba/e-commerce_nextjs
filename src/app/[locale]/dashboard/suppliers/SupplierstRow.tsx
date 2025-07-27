import { SupplierType } from "@/types/supplier";
import {
  TableRow,
  IconButton,
  Tooltip,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

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
  row: SupplierType;
  onDelete: () => void;
  onEdit: () => void;
  t: (key: string) => string;
};

export default function SupplierRow({ row, onDelete, onEdit, t }: Props) {
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

      <StyledTableCell>{row.phone || "--"}</StyledTableCell>
      <StyledTableCell sx={{ color: row.status === "active" ? "green" : "red" }}>{row.status || "--"}</StyledTableCell>
      <StyledTableCell>
        <Link href={row.website}>website</Link>
      </StyledTableCell>

      <StyledTableCell>
        <Tooltip
          title={t("deleteLabel")}
          slotProps={{ tooltip: { sx: { fontSize: "1.3rem", p: 1 } } }}
        >
          <IconButton color="error" onClick={onDelete}>
            <i className="fa-solid fa-trash-xmark fs-3" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>

      <StyledTableCell>
        <Tooltip
          title={t("editProduct")}
          slotProps={{ tooltip: { sx: { fontSize: "1.3rem", p: 1 } } }}
        >
          <IconButton color="primary" onClick={onEdit}>
            <i className="fa-regular fa-file-pen fs-3" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
}
