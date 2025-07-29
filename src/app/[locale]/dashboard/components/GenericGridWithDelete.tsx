"use client";
import { useCallback, useMemo, useState } from "react";
import { BrandCard } from "./BrandCard";
import { useTranslations } from "next-intl";
import AlertDialogSlide from "./AlertDialogSlide";
import { Brand, Category } from "@/types";
interface Props {
  data: Category[] | Brand[] ; 
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
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);
  const dataList = useMemo(
    () =>
      data?.map((category) => (
        <BrandCard
          key={category._id}
          data={category}
          module={module}
          onDelete={handleDeleteClick}
          isPending={isPending}
          editBrand={editData}
          deleteBrand={deleteData}
          loadingDelete={loadingDelete}
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
