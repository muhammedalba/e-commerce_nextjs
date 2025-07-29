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
import ExportButtons from "./ExportButtons";

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

// ========== Types ==========
export type Column<T> = {
  key: keyof T | string;
  label: string;
  colSpan?: number;
};

type GenericTableProps<T> = {
  data: T[];
  error?: string;
  columns: Column<T>[];
  noDataText?: string;
  isLoading?: boolean;
  t: (key: string) => string;
  handleDeleteClick: (id: string) => void;
  handleEdit: (slug: string) => void;
  Row: React.FC<{
    row: T;
    isLoading?: boolean;
    onDelete: () => void;
    onEdit: () => void;
    t: (key: string) => string;
  }>;
  skeletonRowsCount?: number;
};

// ========== Component ==========
export default function GenericTable<T extends { slug: string; _id: string }>({
  data,
  columns,
  noDataText = "No Data",
  isLoading = false,
  t,
  handleDeleteClick,
  handleEdit,
  Row,
  skeletonRowsCount = 5,
  error,
}: GenericTableProps<T>) {
  return (
    <>
      {/* Export Buttons */}
      <ExportButtons data={data} columns={columns} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          {/* Table Head  */}
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell key={String(col.key)} colSpan={col.colSpan}>
                  {col.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* table body */}
          <TableBody>
            {isLoading ? (
              [...Array(skeletonRowsCount)].map((_, i) => (
                <StyledTableRow key={`skeleton-${i}`}>
                  {columns.map((col) => (
                    <StyledTableCell key={String(col.key)} align="center">
                      <Skeleton
                        variant="rounded"
                        sx={{ width: "100%" }}
                        height={40}
                      />
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : data.length === 0 && !error ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length} align="center">
                  {noDataText}
                </StyledTableCell>
              </StyledTableRow>
            ) : error ? (
              <StyledTableRow>
                <StyledTableCell
                  style={{ color: "red" }}
                  colSpan={columns.length}
                  align="center"
                >
                  {error}
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data.map((data) => (
                <Row
                  key={data._id}
                  row={data}
                  isLoading={isLoading}
                  onDelete={() => handleDeleteClick(data._id)}
                  onEdit={() => handleEdit(data.slug)}
                  t={t}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
