"use client";
import React, { useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";
import UsersRow from "./UsersRow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDeleteUser, useGetAllUsers } from "@/lib/API/hooks/useUsers";
import PageTitleWithAddButton from "../components/PageTitleWithAddButton";
import PaginationControls from "../components/PaginationControls";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import PageStatus from "../components/PageStatus";
import GenericTableWithDelete from "../components/GenericTableWithDelete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-white)",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const Users = () => {
  const t = useTranslations("Users");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const numericLimit = useMemo(() => Number(itemsPerPage), [itemsPerPage]);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetAllUsers(
    page,
    numericLimit,
    searchQuery?.toString()
  );
console.log("data",data);

  const { mutate: deleteUser, isPending } = useDeleteUser();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const columns = useMemo(
    () => [
      { key: "avatar", label: t("TableRowData.avatar"), colSpan: 1 },
      { key: "name", label: t("TableRowData.name"), colSpan: 1 },
      { key: "email", label: t("TableRowData.email"), colSpan: 1 },
      { key: "role", label: t("TableRowData.role"), colSpan: 1 },
      { key: "status", label: t("TableRowData.status"), colSpan: 1 },
      { key: "actions", label: t("TableRowData.actions"), colSpan: 2 },
    ],
    [t]
  );

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <>
      <PageTitleWithAddButton
        title={t("title")}
        buttonLabel={t("add_user")}
        path="/dashboard/users/addUser"
      />
      <div className="container mt-5">
        <PageStatus
          results={data?.results}
          page={page}
          t={t}
          className="mb-4"
        />

        <GenericTableWithDelete
          t={t}
          isLoading={isLoading}
          isPending={isPending}
          data={data?.data || []}
          error={error?.message}
          columns={columns}
          Row={UsersRow}
          title={t("confirmDeleteTitle")}
          noDataText={t("noUsers")}
          message={t("confirmDeleteMessage", { name: "userToDelete.name" })}
          agreeLabel={t("deleteLabel")}
          cancelLabel={t("cancelLabel")}
          deleteData={deleteUser}
          path="/dashboard/users"
        />
      </div>
      <PaginationControls
        setPage={setPage}
        setLimit={setItemsPerPage}
        limit={itemsPerPage}
        page={page}
        count={data?.pagination.numberOfPages ?? 1}
      />
    </>
  );
};

export default Users;
