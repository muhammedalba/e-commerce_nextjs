"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import PaginationControls from "../components/PaginationControls";
import {
  useGetAllSuppliers,
  useDeleteSupplier,
} from "@/lib/API/hooks/useSupplier";
import SupplierRow from "./SupplierstRow";
import GenericTableWithDelete from "../components/GenericTableWithDelete";
import { toast } from "react-toastify";

export default function SuppliersPage() {
  const t = useTranslations("Supplier");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const { mutate: deleteSupplier, isPending } = useDeleteSupplier();

  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const numericLimit = useMemo(() => Number(itemsPerPage), [itemsPerPage]);
  const { data, error, isLoading } = useGetAllSuppliers(
    page,
    numericLimit,
    searchQuery?.toString()
  );
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const columns = useMemo(
    () => [
      { key: "avatar", label: t("TableRowData.avatar"), colSpan: 1 },
      { key: "contactName", label: t("TableRowData.contactName"), colSpan: 1 },
      { key: "address", label: t("TableRowData.address"), colSpan: 1 },
      { key: "email", label: t("TableRowData.email"), colSpan: 1 },
      { key: "phone", label: t("TableRowData.phone"), colSpan: 1 },
      { key: "status", label: t("TableRowData.status"), colSpan: 1 },
      { key: "website", label: t("TableRowData.website"), colSpan: 1 },
      { key: "actions", label: t("TableRowData.actions"), colSpan: 2 },
    ],
    [t]
  );

  return (
    <div className="body-root-inner">
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addSupplier")}
        path="/dashboard/suppliers/addSupplier"
      />

      <div className="container mt-5">
        <PageStatus
          results={data?.results}
          page={page}
          t={t}
          className="mb-4"
        />

        <GenericTableWithDelete
          t={t}
          isLoading={isLoading}
          isPending={isPending}
          data={data?.data || []}
          error={error?.message}
          columns={columns}
          Row={SupplierRow}
          title={t("confirmDeleteTitle")}
          noDataText={t("noSuppliers")}
          message={t("confirmDeleteMessage")}
          agreeLabel={t("deleteLabel")}
          cancelLabel={t("cancelLabel")}
          deleteData={deleteSupplier}
          path="/dashboard/suppliers"
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
