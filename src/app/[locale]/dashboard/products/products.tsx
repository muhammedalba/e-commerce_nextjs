"use client";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDeleteProduct, useGetAllProducts } from "@/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { toast } from "react-toastify";
import PaginationControls from "../components/PaginationControls";
import GenericTable from "../components/GenericTable";
import ProductRow from "./ProductRow";

export default function ProductsPage() {
  const t = useTranslations("Products");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [isPendingTransition, startTransition] = useTransition();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const numericLimit = useMemo(() => Number(itemsPerPage), [itemsPerPage]);
  const { data, error, isLoading } = useGetAllProducts(
    page,
    numericLimit,
    searchQuery?.toString()
  );

  const columns = useMemo(
    () => [
      { key: "imageCover", label: t("TableRowData.image"), colSpan: 1 },
      { key: "title", label: t("TableRowData.title"), colSpan: 1 },
      { key: "brand", label: t("TableRowData.brand"), colSpan: 1 },
      { key: "category", label: t("TableRowData.category"), colSpan: 1 },
      { key: "price", label: t("TableRowData.price"), colSpan: 1 },
      { key: "quantity", label: t("TableRowData.quantity"), colSpan: 1 },
      { key: "sold", label: t("TableRowData.sold"), colSpan: 1 },
      { key: "actions", label: t("TableRowData.actions"), colSpan: 2 },
    ],
    [t]
  );

  const handleChangePage = useCallback((_: unknown, value: number) => {
    startTransition(() => setPage(value));
  }, []);

  const handleChangeLimit = useCallback((event: SelectChangeEvent) => {
    startTransition(() => setItemsPerPage(event.target.value));
  }, []);

  const handleEdit = useCallback(
    (slug: string) => {
      router.push(`/dashboard/products/${slug}`);
    },
    [router]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedId(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!selectedId) return;
    deleteProduct(selectedId, {
      onSuccess: () => {
        toast.success(t("deleteSuccess"));
        handleClose();
      },
      onError: (err: any) => {
        toast.error(err.message || t("deleteError"));
        handleClose();
      },
    });
  }, [selectedId, deleteProduct, handleClose, t]);

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  return (
    <div className="body-root-inner">
      <AlertDialogSlide
        open={open}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        handleAgree={handleDeleteConfirm}
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

        <GenericTable
          data={data?.data || []}
          columns={columns}
          isLoading={isLoading}
          t={t}
          handleDeleteClick={handleDeleteClick}
          handleEdit={handleEdit}
          Row={ProductRow}
          noDataText={t("noProducts")}
        />
      </div>

      <PaginationControls
        limit={itemsPerPage}
        page={page}
        count={data?.pagination.numberOfPages ?? 1}
        isPending={isPendingTransition}
        onLimitChange={handleChangeLimit}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
