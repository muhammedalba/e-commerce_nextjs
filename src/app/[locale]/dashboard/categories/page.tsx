"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import {
  useDeleteCategory,
  useGetAllCategories,
} from "@/lib/abi/hooks/useCategories";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import SkeletonGrid from "../components/SkeletonGrid";
import GenericGridWithDelete from "../components/GenericGridWithDelete";

export default function Home() {
  const t = useTranslations("Categories");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  const numericLimit = useMemo(() => Number(limit), [limit]);

  const { data, isError, error, isSuccess, isLoading } = useGetAllCategories(
    page,
    numericLimit,
    searchQuery?.toString()
  );

  const isEmpty = useMemo(
    () => isSuccess && data?.data.length === 0,
    [data, isSuccess]
  );

  if (isLoading) return <SkeletonGrid count={12} width={150} height={150} />;
  if (isError)
    return (
      <p>
        {t("errorOccurred")}: {String(error)}
      </p>
    );
  if (isEmpty) return <p> {t("noCategories")} </p>;

  return (
    <div className="body-root-inner">
      {/* page title and button */}
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addCategory")}
        path="/dashboard/categories/addCategory"
      />
      {/* page result and current page number */}
      <PageStatus page={page} results={data?.results} t={t} />
      {/* card data   */}
      <GenericGridWithDelete
        data={data?.data || []}
        module="categories"
        deleteFn={deleteCategory}
        t={t}
        isPending={isPending}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        editData={t("editCategory")}
        deleteData={t("deleteCategory")}
        loadingDelete={t("loadingDelete")}
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
