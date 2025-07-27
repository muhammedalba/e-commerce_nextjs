"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import AlertDialogSlide from "../components/AlertDialogSlide";
import { BrandCard } from "../components/BrandCard";
import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import {
  useDeleteCategory,
  useGetAllCategories,
} from "@/lib/abi/hooks/useCategories";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import SkeletonGrid from "../components/SkeletonGrid";

export default function Home() {
  const t = useTranslations("Categories");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);

  const numericLimit = useMemo(() => Number(limit), [limit]);

  const { data, isError, error, isSuccess, isLoading } = useGetAllCategories(
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

  const categoryList = useMemo(
    () =>
      data?.data.map((category) => (
        <BrandCard
          key={category._id}
          data={category}
          module="categories"
          onDelete={handleDeleteClick}
          isPending={isPending}
          selectedId={selectedId}
          editBrand={t("editCategory")}
          deleteBrand={t("deleteCategory")}
          loadingDelete={t("loadingDelete")}
        />
      )),
    [data?.data, handleDeleteClick, isPending, selectedId]
  );

  if (isLoading)
    return <SkeletonGrid count={12} width={150} height={150} />;
  if (isError)
    return (
      <p>
        {t("errorOccurred")}: {String(error)}
      </p>
    );
  if (isEmpty) return <p> {t("noCategories")} </p>;

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
        deleteFn={deleteCategory}
        t={t}
      />
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addCategory")}
        path="/dashboard/categories/addCategory"
      />
      <PageStatus page={page} results={data?.results} t={t} />

      <div className="vendor-list-main-wrapper overflow-auto">
        <div className="card-body">
          <div className="rts-brand-area-main">
            <div className="row g-4">{categoryList}</div>
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
