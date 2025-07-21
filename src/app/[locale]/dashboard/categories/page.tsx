"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { SelectChangeEvent } from "@mui/material/Select";
import Loading from "../../loading";
import AlertDialogSlide from "../components/AlertDialogSlide";
import { BrandCard } from "../components/BrandCard";
import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import { useDeleteCategory, useGetAllCategories } from "@/hooks/useCategories";
import PageStatus from "../components/PageStatus";

export default function Home() {
  const t = useTranslations("Categories");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [isPendingTransition, startTransition] = useTransition();
  const { mutate: deleteBrand, isPending } = useDeleteCategory();

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

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedId(null);
  }, []);

  const handleAgree = useCallback(() => {
    if (!selectedId) return;
    deleteBrand(selectedId, {
      onSuccess: () => {
        toast.success(t("deleteSuccess"));
        handleClose();
      },
      onError: (err) => {
        toast.error(err.message || t("deleteError"));
        handleClose();
      },
    });
  }, [selectedId, deleteBrand, handleClose]);

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  const handleChange = useCallback((_: unknown, value: number) => {
    startTransition(() => {
      setPage(value);
    });
  }, []);

  const handleChangeLimit = useCallback((event: SelectChangeEvent) => {
    startTransition(() => {
      setLimit(event.target.value);
    });
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

  if (isLoading || isPendingTransition) return <Loading />;
  if (isError)
    return (
      <p>
        {" "}
        {t("errorOccurred")}: {String(error)}
      </p>
    );
  if (isEmpty) return <p> {t("noCategories")} </p>;

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

      <div className="title-right-actioin-btn-wrapper-product-list">
        <h3 className="title">{t("title")}</h3>
        <div className="button-wrapper">
          <Link
            href="/dashboard/categories/addCategory"
            className="rts-btn btn-primary"
          >
            {t("addCategory")}
          </Link>
        </div>
      </div>

      <PageStatus page={page} results={data?.results} t={t} />

      <div className="vendor-list-main-wrapper overflow-auto">
        <div className="card-body">
          <div className="rts-brand-area-main">
            <div className="row g-4">{categoryList}</div>
          </div>
        </div>
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
