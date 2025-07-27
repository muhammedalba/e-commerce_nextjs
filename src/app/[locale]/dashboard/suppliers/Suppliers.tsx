"use client";
import React, { useCallback, useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { toast } from "react-toastify";
import PaginationControls from "../components/PaginationControls";
import GenericTable from "../components/GenericTable";
import {
  useGetAllSuppliers,
  useDeleteSupplier,
} from "@/lib/abi/hooks/useSupplier";
import SupplierRow from "./SupplierstRow";

export default function SuppliersPage() {
  const t = useTranslations("Products");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const { mutate: deleteSupplier, isPending } = useDeleteSupplier();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const numericLimit = useMemo(() => Number(itemsPerPage), [itemsPerPage]);
  const { data, error, isLoading } = useGetAllSuppliers(
    page,
    numericLimit,
    searchQuery?.toString()
  );
  console.log("data", data);
  console.log("error", error);

  const columns = useMemo(
    () => [
      { key: "avatar", label: t("TableRowData.image"), colSpan: 1 },
      { key: "name", label: t("TableRowData.title"), colSpan: 1 },
      { key: "contactName", label: t("TableRowData.brand"), colSpan: 1 },
      { key: "address", label: t("TableRowData.category"), colSpan: 1 },
      { key: "email", label: t("TableRowData.price"), colSpan: 1 },
      { key: "phone", label: t("TableRowData.quantity"), colSpan: 1 },
      { key: "status", label: t("TableRowData.sold"), colSpan: 1 },
      { key: "website", label: t("TableRowData.actions"), colSpan: 1 },
      { key: "actions", label: t("TableRowData.actions"), colSpan: 2 },
    ],
    [t]
  );


  const handleEdit = useCallback(
    (slug: string) => {
      router.push(`/dashboard/suppliers/${slug}`);
    },
    [router]
  );


  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  return (
    <div className="body-root-inner">
      <AlertDialogSlide
        setOpen={setOpen}
        open={open}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        isPending={isPending}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        deleteFn={deleteSupplier}
        t={t}
      />
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addProduct")}
        path="/dashboard/supplier/addSupplier"
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
          Row={SupplierRow}
          noDataText={t("noProducts")}
        />
      </div>

      <PaginationControls
        setPage={setPage}
        setLimit={setItemsPerPage}
        limit={itemsPerPage}
        page={page}
        count={data?.pagination.numberOfPages ?? 1}
      />
    </div>
  );
}
