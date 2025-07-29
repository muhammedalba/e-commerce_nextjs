"use client";
import { useCallback, useState } from "react";
import AlertDialogSlide from "./AlertDialogSlide";
import { useTranslations } from "next-intl";
import GenericTable from "./GenericTable";
import { useRouter } from "next/navigation";

interface TableRowProps<T> {
  row: T;
  isLoading?: boolean;
  onDelete: () => void;
  onEdit: () => void;
  t: (key: string) => string;
}

interface Props<T> {
  data: T[];
  error?: string;
  columns: {
    key: string;
    label: string;
    colSpan?: number;
  }[];
  Row: React.FC<TableRowProps<T>>;
  title: string;
  message: string;
  agreeLabel: string;
  cancelLabel: string;
  noDataText: string;
  deleteData: (id: string) => void;
  t: ReturnType<typeof useTranslations>;
  isPending: boolean;
  isLoading: boolean;
  path: string;
}

function GenericTableWithDelete<T extends { slug: string; _id: string }>({
  data,
  columns,
  Row,
  isLoading,
  title,
  message,
  agreeLabel,
  cancelLabel,
  isPending,
  deleteData,
  noDataText,
  t,
  path,
  error,
}: Props<T>) {

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  const handleEdit = useCallback(
    (slug: string) => {
      router.push(`${path}/${slug}`);
    },
    [router]
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
        isPending={isPending || isLoading}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        deleteFn={deleteData}
        t={t}
      />
      <GenericTable
        t={t}
        data={data || []}
        Row={Row}
        columns={columns}
        isLoading={isLoading}
        error={error}
        handleDeleteClick={handleDeleteClick}
        handleEdit={handleEdit}
        noDataText={noDataText}
      />
    </>
  );
}

export default GenericTableWithDelete;
