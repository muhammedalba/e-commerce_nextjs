"use client";
import { useDeleteBrand, useGetAllBrands } from "@/lib/abi/hooks/useBrands";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import AlertDialogSlide from "../components/AlertDialogSlide";
import { BrandCard } from "../components/BrandCard";
import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import SkeletonGrid from "../components/SkeletonGrid";

export default function Home() {
  const t = useTranslations("Brands");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const numericLimit = useMemo(() => Number(limit), [limit]);
  
  
  const { mutate: deleteBrand, isPending } = useDeleteBrand();
  const { data, isError, error, isSuccess, isLoading } = useGetAllBrands(
    page,
    numericLimit,
    searchQuery?.toString()
  );


  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);


  const isEmpty = useMemo(
    () => isSuccess && data?.data.length === 0,
    [data, isSuccess]
  );

  const brandList = useMemo(
    () =>
      data?.data.map((brand) => (
        <BrandCard
          key={brand._id}
          data={brand}
          module="brands"
          onDelete={handleDeleteClick}
          isPending={isPending}
          selectedId={selectedId}
          editBrand={t("editBrand")}
          deleteBrand={t("deleteBrand")}
          loadingDelete={t("loadingDelete")}
        />
      )),
    [data?.data, handleDeleteClick, isPending, selectedId]
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
        deleteFn={deleteBrand}
        t={t}
      />

      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addBrand")}
        path="/dashboard/brands/addBrand"
      />
      <PageStatus page={page} results={data?.results} t={t} />

      <div className="vendor-list-main-wrapper overflow-auto">
        <div className="card-body">
          <div className="rts-brand-area-main">
            <div className="row g-4">{brandList}</div>
          </div>
        </div>
      </div>

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
