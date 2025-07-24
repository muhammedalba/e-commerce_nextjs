"use client";
import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
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
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

// Column type
export type Column<T> = {
  key: string;
  label: string;
  colSpan?: number;
  //   render?: (row: T) => React.ReactNode;
};

// Props
type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  noDataText?: string;
  isLoading?: boolean;
  t: (key: string) => string;
  handleDeleteClick: (id: string) => void;
  handleEdit: (slug: string) => void;
  Row: React.FC<{
    row: T;
    onDelete: () => void;
    onEdit: () => void;
    t: (key: string) => string;
  }>;
};

export default function GenericTable<T extends { slug: string; _id: string }>({
  data,
  columns,
  noDataText = "No Data",
  isLoading = false,
  t,
  handleDeleteClick,
  handleEdit,
  Row,
}: GenericTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col.key} colSpan={col.colSpan}>
                {col.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <StyledTableRow>
              {columns.map((i) => {
                return (
                  <StyledTableCell key={i.key} align="center">
                    <Skeleton
                      variant="rounded"
                      sx={{ width: "100%" }}
                      height={40}
                    />
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ) : (
            !isLoading &&
            (!data?.length ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length} align="center">
                  {noDataText}
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data?.map((row, i) => (
                <Row
                  key={i}
                  row={row}
                  onDelete={() => handleDeleteClick(row._id)}
                  onEdit={() => handleEdit(row.slug)}
                  t={t}
                />
              ))
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
