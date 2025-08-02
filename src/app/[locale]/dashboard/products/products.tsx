"use client";
import React, { useEffect, useMemo, useState } from "react";

import {
  useDeleteProduct,
  useGetAllProducts,
} from "@/lib/API/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";

import PaginationControls from "../components/PaginationControls";

import ProductRow from "./ProductRow";
import GenericTableWithDelete from "../components/GenericTableWithDelete";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const t = useTranslations("Products");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return (
    <div className="body-root-inner">
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

        <GenericTableWithDelete
          data={data?.data || []}
          error={error?.message}
          columns={columns}
          isLoading={isLoading}
          t={t}
          title={t("confirmDeleteTitle")}
          Row={ProductRow}
          noDataText={t("noProducts")}
          message={t("confirmDeleteMessage")}
          agreeLabel={t("deleteLabel")}
          cancelLabel={t("cancelLabel")}
          isPending={isPending}
          deleteData={deleteProduct}
          path="/dashboard/products"
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
