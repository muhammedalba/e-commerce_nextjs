"use client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useDeleteProduct, useGetAllProducts } from "@/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import React from "react";
import Image from "next/image";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { toast } from "react-toastify";
import PaginationControls from "../components/PaginationControls";
import formatDate from "@/lib/utils/formatDate";
import { formatPrice } from "@/lib/utils/formatPrice";

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

export default function ProductsPage() {
  const t = useTranslations("Products");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [isPendingTransition, startTransition] = useTransition();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const locale = useLocale();
  const numericLimit = useMemo(() => Number(limit), [limit]);
  const { data, isError, error, isSuccess, isLoading } = useGetAllProducts(
    page,
    numericLimit,
    searchQuery?.toString()
  );

  const handleChange = useCallback((_: unknown, value: number) => {
    startTransition(() => setPage(value));
  }, []);

  const handleChangeLimit = useCallback((event: SelectChangeEvent) => {
    startTransition(() => setLimit(event.target.value));
  }, []);

  const handleEdit = (slug: string) => {
    router.push(`/dashboard/products/${slug}`);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedId(null);
  }, []);

  const handleAgree = useCallback(() => {
    if (!selectedId) return;
    deleteProduct(selectedId, {
      onSuccess: () => {
        toast.success(t("deleteSuccess"));
        handleClose();
      },
      onError: (err) => {
        toast.error(err.message || t("deleteError"));
        handleClose();
      },
    });
  }, [selectedId, deleteProduct, handleClose]);

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  const TableRowData = [
    t("TableRowData.image"),
    t("TableRowData.title"),
    t("TableRowData.brand"),
    t("TableRowData.category"),
    t("TableRowData.price"),
    t("TableRowData.priceAfterDiscount"),
    t("TableRowData.quantity"),
    t("TableRowData.sold"),
    // t("TableRowData.date"),
    t("TableRowData.actions"),
  ];

  const TableRows = useMemo(
    () =>
      TableRowData.map((title, i) => (
        <StyledTableCell
          key={i}
          colSpan={i === TableRowData.length - 1 ? 2 : 1}
        >
          {title}
        </StyledTableCell>
      )),
    [TableRowData]
  );

  return (
    <div className="body-root-inner">
      <AlertDialogSlide
        open={open}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        handleAgree={handleAgree}
        handleClose={handleClose}
        isPending={isPending}
      />

      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addProduct")}
        path="/dashboard/product/addProduct"
      />

      <div className="container mt-5">
        <PageStatus
          results={data?.results}
          page={page}
          t={t}
          className="mb-4"
        />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>{TableRows}</TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell onClick={() => handleEdit(row._id)}>
                    <Image
                      src={row.imageCover}
                      alt={row.title}
                      width={50}
                      height={50}
                      style={{ borderRadius: "4px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.title || "--"}</StyledTableCell>
                  <StyledTableCell>{row.brand?.name || "--"}</StyledTableCell>
                  <StyledTableCell>
                    {row.category?.name || "--"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.price ? formatPrice(row.price) : "--"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.priceAfterDiscount
                      ? formatPrice(row.priceAfterDiscount)
                      : "--"}
                  </StyledTableCell>
                  <StyledTableCell>{row.quantity ?? "--"}</StyledTableCell>
                  <StyledTableCell>{row.sold ?? "--"}</StyledTableCell>
                  {/* <StyledTableCell>
                    {formatDate(row.createdAt, locale)}
                  </StyledTableCell> */}
                  <StyledTableCell>
                    <Tooltip
                      title={t("deleteLabel")}
                      slotProps={{
                        tooltip: {
                          sx: { fontSize: "1.3rem", padding: "8px" },
                        },
                      }}
                    >
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(row._id)}
                      >
                        <i className="fa-solid fa-trash-xmark fs-3"></i>
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Tooltip
                      title={t("editProduct")}
                      slotProps={{
                        tooltip: {
                          sx: { fontSize: "1.3rem", padding: "8px" },
                        },
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(row._id)}
                      >
                        <i className="fa-regular fa-file-pen fs-3"></i>
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <PaginationControls
        limit={limit}
        page={page}
        count={data?.pagination.numberOfPages ?? 1}
        isPending={isPendingTransition}
        onLimitChange={handleChangeLimit}
        onPageChange={handleChange}
      />
    </div>
  );
}
