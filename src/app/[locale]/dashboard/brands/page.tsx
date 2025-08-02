"use client";
import { useDeleteBrand, useGetAllBrands } from "@/lib/API/hooks/useBrands";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import SkeletonGrid from "../components/SkeletonGrid";
import GenericGridWithDelete from "../components/GenericGridWithDelete";

export default function Home() {
  const t = useTranslations("Brands");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const numericLimit = useMemo(() => Number(limit), [limit]);

  const { mutate: deleteBrand, isPending } = useDeleteBrand();
  const { data, isError, error, isSuccess, isLoading } = useGetAllBrands(
    page,
    numericLimit,
    searchQuery?.toString()
  );

  const isEmpty = useMemo(
    () => isSuccess && data?.data.length === 0,
    [data, isSuccess]
  );

  if (isLoading) {
    return <SkeletonGrid count={12} width={150} height={150} />;
  }
  if (isError)
    return (
      <p>
        {t("errorOccurred")}: {String(error)}
      </p>
    );
  if (isEmpty) return <p> {t("noBrands")} </p>;

  return (
    <div className="body-root-inner">
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addBrand")}
        path="/dashboard/brands/addBrand"
      />
      <PageStatus page={page} results={data?.results} t={t} />

      {/* card data   */}
      <GenericGridWithDelete
        data={data?.data || []}
        module="brands"
        deleteFn={deleteBrand}
        t={t}
        isPending={isPending}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        editData={t("editBrand")}
        deleteData={t("deleteBrand")}
        loadingDelete={t("loadingDelete")}
      />

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
