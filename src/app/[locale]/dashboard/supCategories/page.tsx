"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";

import GenericTableWithDelete from "../components/GenericTableWithDelete";
import {
  useDeleteSupCategory,
  useGetAllSupCategories,
} from "@/lib/abi/hooks/useSupCategories";
import SupCategoryRow from "./SupCategoryRow";
export default function Home() {
  const t = useTranslations("SupCategories");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const { mutate: deleteSupCategory, isPending ,error:deleteError} = useDeleteSupCategory();

  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  const numericLimit = useMemo(() => Number(limit), [limit]);

  const { data, isError, error, isSuccess, isLoading } = useGetAllSupCategories(
    page,
    numericLimit,
    searchQuery?.toString()
  );


  console.log(data, "console.log(data)");
  console.log(deleteError, "deleteError");

  const columns = useMemo(
    () => [
      { key: "name", label: t("TableRowData.name"), colSpan: 1 },
      {
        key: "category name",
        label: t("TableRowData.categoryName"),
        colSpan: 1,
      },
      { key: "image", label: t("TableRowData.image"), colSpan: 1 },
      { key: "actions", label: t("TableRowData.actions"), colSpan: 2 },
    ],
    [t]
  );

  const isEmpty = useMemo(
    () => isSuccess && data?.data.length === 0,
    [data, isSuccess]
  );

  if (isError)
    return (
      <p>
        {t("errorOccurred")}: {String(error)}
      </p>
    );
  if (isEmpty) return <p> {t("noSupCategories")} </p>;

  return (
    <div className="body-root-inner">
      {/* page title and button */}
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addSupCategory")}
        path="/dashboard/supCategories/addSupCategory"
      />

      {/* page result and current page number */}
      <PageStatus page={page} results={data?.results} t={t} />

      {/* card data   */}
      <GenericTableWithDelete
        data={data?.data || []}
        error={error|| undefined}
        columns={columns}
        isLoading={isLoading}
        t={t}
        title={t("confirmDeleteTitle")}
        Row={SupCategoryRow}
        noDataText={t("noSupCategories")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        isPending={isPending}
        deleteData={deleteSupCategory}
        path="/dashboard/supCategories"
      />

      {/* Pagination */}
      <PaginationControls
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        page={page}
        count={data?.pagination.numberOfPages ?? 1}
      />
    </div>
  );
}
