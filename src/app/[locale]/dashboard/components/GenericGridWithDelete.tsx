"use client";
import { useCallback, useMemo, useState } from "react";
import { GenericGridCard } from "./GenericGridCard";
import { useTranslations } from "next-intl";
import AlertDialogSlide from "./AlertDialogSlide";
import { BrandType, CarouselType, CategoryType } from "@/types";
interface Props {
  data: CategoryType[] | BrandType[] | CarouselType[];
  module: string;
  title: string;
  message: string;
  agreeLabel: string;
  cancelLabel: string;
  editData: string;
  deleteData: string;
  loadingDelete: string;
  t: ReturnType<typeof useTranslations>;
  isPending: boolean;
  deleteFn: (id: string, {}) => void;
  inactive?: string;
  active?: string;
}
export default function GenericGridWithDelete({
  data,
  module,
  deleteFn,
  t,
  isPending,
  title,
  message,
  agreeLabel,
  cancelLabel,
  editData,
  deleteData,
  loadingDelete,
  inactive,
  active,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  const dataList = useMemo(
    () =>
      data?.map((data) => (
        <GenericGridCard
          key={data._id}
          data={data}
          module={module}
          onDelete={handleDeleteClick}
          isPending={isPending}
          editBrand={editData}
          deleteBrand={deleteData}
          loadingDelete={loadingDelete}
          inactive={inactive}
          active={active}
        />
      )),
    [data, handleDeleteClick, isPending, selectedId]
  );
  return (
    <>
      <AlertDialogSlide
        setOpen={setOpen}
        open={open}
        title={title}
        message={message}
        agreeLabel={agreeLabel}
        cancelLabel={cancelLabel}
        isPending={isPending}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        deleteFn={deleteFn}
        t={t}
      />
      <div className="vendor-list-main-wrapper overflow-auto">
        <div className="card-body">
          <div className="rts-brand-area-main">
            <div className="row g-4">{dataList}</div>
          </div>
        </div>
      </div>
    </>
  );
}
