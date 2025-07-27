"use client";
import React from "react";
import { Button, Box } from "@mui/material";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useTranslations } from "next-intl"; 

type Column<T> = {
  key: keyof T | string;
  label: string;
  colSpan?: number;
};

interface ExportButtonsProps<T> {
  data: T[];
  columns: Column<T>[];
}

const ExportButtons = <T extends Record<string, any>>({
  data,
  columns,
}: ExportButtonsProps<T>) => {
  const t = useTranslations(); // قم بتعديله حسب مكتبة الترجمة المستخدمة

  const exportToExcel = () => {
    const excelData = data.map((item) => {
      const row: Record<string, any> = {};
      columns.forEach((col) => {
        row[col.label] = item[col.key];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    const exportableColumns = columns.filter((col) => col.key !== "imageCover");
    const head = [exportableColumns.map((col) => col.label)];

    const body = data.map((row) =>
      exportableColumns.map((col) => {
        const value = row[col.key];

        if (
          col.key === "price" &&
          "priceAfterDiscount" in row &&
          row.priceAfterDiscount
        ) {
          return String(row.priceAfterDiscount);
        }

        if (typeof value === "object" && value !== null && "name" in value) {
          return value.name;
        }

        return String(value ?? "");
      })
    );

    autoTable(doc, { head, body });
    doc.save("data_without_images.pdf");
  };

  return (
    <Box display="flex" gap={2} justifyContent="flex-end" mb={2}>
      <Button variant="outlined" color="primary" onClick={exportToExcel}>
        {'t("Export to Excel")'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={exportToPDF}>
        {'t("Export to PDF")'}
      </Button>
    </Box>
  );
};

export default ExportButtons;
