"use client";
import {
  useDeleteCarousel,
  useGetAllCarousels,
} from "@/lib/API/hooks/useCarousel";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import PaginationControls from "../components/PaginationControls";
import { useTranslations } from "next-intl";
import PageStatus from "../components/PageStatus";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import SkeletonGrid from "../components/SkeletonGrid";
import GenericGridWithDelete from "../components/GenericGridWithDelete";
import AlertDialogSlide from "../components/AlertDialogSlide";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "@mui/material";

export default function Home() {
  const t = useTranslations("Carousel");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState(1);
  const numericLimit = useMemo(() => Number(limit), [limit]);

  const { mutate: deleteCarousel, isPending } = useDeleteCarousel();
  const { data, isError, error, isSuccess, isLoading } = useGetAllCarousels(
    page,
    numericLimit,
    searchQuery?.toString()
  );
  console.log(data);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);
  const dataList = useMemo(
    () =>
      data?.data?.map((data, i) => (
        <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
          <div className="single-brand-area-start">
            <Link href={`/dashboard/carousel/${data._id}`} className="logo ">
              <Image
                width={150}
                height={150}
                src={data?.carouselSm || ""}
                alt={"carousel"}
                className="img-fluid"
                style={{ objectFit: "cover" }}
              />
            </Link>
            <p className="item pt-4">{data.description}</p>
            <p className="item pt-4">{data.isActive ? t('active') : t('inactive')}</p>
            <div className="d-flex align-item-center justify-content-between">
              <Tooltip
                title={
                  isPending ? t("loadingDelete") : t("deleteCarousel") || "حذف"
                }
                slotProps={{
                  tooltip: {
                    sx: {
                      fontSize: "1.3rem",
                      padding: "8px",
                    },
                  },
                }}
              >
                <span>
                  <button
                    className="w-auto text-danger p-3 rounded rounded-2 "
                    type="button"
                    //   title="حذف"
                    aria-label={t("deleteCarousel") || "حذف"}
                    disabled={isPending}
                    onClick={() => handleDeleteClick(data._id)}
                  >
                    <i className="fa-solid fa-trash-xmark fs-3"></i>
                  </button>
                </span>
              </Tooltip>
              <Tooltip
                title={t("editCarousel") || "تعديل"}
                slotProps={{
                  tooltip: {
                    sx: {
                      fontSize: "1.3rem",
                      padding: "8px",
                    },
                  },
                }}
              >
                <Link
                  href={`/dashboard/carousel/${data._id}`}
                  className="text-primary p-3 rounded rounded-2  "
                >
                  <i className="fa-regular fa-file-pen fs-3"></i>
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
      )),
    [data, handleDeleteClick, isPending, selectedId]
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
  if (isEmpty) return <p> {t("noCarousels")} </p>;

  return (
    <div className="body-root-inner">
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("addCarousel")}
        path="/dashboard/carousel/addCarousel"
      />
      <PageStatus page={page} results={data?.results} t={t} />

      {/* card data   */}
      {/* <GenericGridWithDelete
        data={data?.data || []}
        module="carousel"
        deleteFn={deleteCarousel}
        t={t}
        isPending={isPending}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        agreeLabel={t("deleteLabel")}
        cancelLabel={t("cancelLabel")}
        editData={t("editCarousel")}
        deleteData={t("deleteCarousel")}
        loadingDelete={t("loadingDelete")}
      /> */}
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
        deleteFn={deleteCarousel}
        t={t}
      />
      <div className="vendor-list-main-wrapper overflow-auto">
        <div className="card-body">
          <div className="rts-brand-area-main">
            <div className="row g-4">{dataList}</div>
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
