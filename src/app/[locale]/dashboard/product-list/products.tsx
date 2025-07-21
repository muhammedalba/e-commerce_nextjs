"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllProducts } from "@/hooks/useProducts";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [isPendingTransition, startTransition] = useTransition();
  //   const { mutate: deleteBrand, isPending } = useDeleteBrand();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  const numericLimit = useMemo(() => Number(limit), [limit]);
  const { data, isError, error, isSuccess, isLoading } = useGetAllProducts(
    page,
    numericLimit,
    searchQuery?.toString()
  );
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">image</StyledTableCell>
            <StyledTableCell>title</StyledTableCell>
            <StyledTableCell align="right">brand </StyledTableCell>
            <StyledTableCell align="right">category</StyledTableCell>
            <StyledTableCell align="right">quantity</StyledTableCell>
            <StyledTableCell align="right">price</StyledTableCell>
            <StyledTableCell align="right">sold</StyledTableCell>
            <StyledTableCell align="right">price After Discount</StyledTableCell>
            <StyledTableCell align="right">createdAt</StyledTableCell>
            <StyledTableCell align="right">delete</StyledTableCell>
            <StyledTableCell align="right">edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="right"><img src={row.imageCover} alt={row.title} /></StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>

              <StyledTableCell align="right">{row.brand?.name||'--'}</StyledTableCell>
              <StyledTableCell align="right">{row.category?.name||'--'}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.sold}</StyledTableCell>
              <StyledTableCell align="right">
                {row.priceAfterDiscount}
              </StyledTableCell>
              <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="right">delete</StyledTableCell>
              <StyledTableCell align="right">edit</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
