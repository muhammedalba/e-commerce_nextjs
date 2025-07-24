import { formatPrice } from "@/lib/utils/formatPrice";
import { ProductType } from "@/types";
import {
  TableRow,
  IconButton,
  Tooltip,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

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
  row: ProductType;
  onDelete: () => void;
  onEdit: () => void;
  t: (key: string) => string;
};

export default function ProductRow({ row, onDelete, onEdit, t }: Props) {
  const displayedPrice = row.priceAfterDiscount ?? row.price;

  return (
    <StyledTableRow>
      <StyledTableCell onClick={onEdit}>
        <Image
          src={row.imageCover || "/placeholder.png"}
          alt={row.title || "product"}
          width={50}
          height={50}
          style={{ borderRadius: 4 }}
        />
      </StyledTableCell>

      <StyledTableCell>{row.title || "--"}</StyledTableCell>
      <StyledTableCell>{row.brand?.name || "--"}</StyledTableCell>
      <StyledTableCell>{row.category?.name || "--"}</StyledTableCell>

      <StyledTableCell>
        {displayedPrice ? formatPrice(displayedPrice) : "--"}
      </StyledTableCell>

      <StyledTableCell>{row.quantity ?? "--"}</StyledTableCell>
      <StyledTableCell>{row.sold ?? "--"}</StyledTableCell>

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
