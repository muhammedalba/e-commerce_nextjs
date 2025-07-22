"use client";

import React, { useMemo, useCallback } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

interface Props {
  limit: string;
  page: number;
  count: number;
  isPending: boolean;
  onLimitChange: (event: SelectChangeEvent) => void;
  onPageChange: (_: unknown, value: number) => void;
}

export default function PaginationControls({
  limit,
  page,
  count,
  isPending,
  onLimitChange,
  onPageChange,
}: Props) {
  const menuItems = useMemo(() => {
    const limits = [10, 20, 50];
    return limits.map((value) => (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    ));
  }, []);

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
        gap: 3,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <FormControl>
        {/* <InputLabel id="limit-label">Limit</InputLabel> */}
        <Select
          labelId="limit-label"
          id="limit"
          value={limit}
          label="Limit"
          onChange={onLimitChange}
        >
          {menuItems}
        </Select>
      </FormControl>

      <Stack spacing={2}>
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "1.4rem", // حجم الخط
              // backgroundColor: "var(--color-light)",
              color: "var(--color-secondary)",
            },
            "& .Mui-selected": {
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                // backgroundColor: '#115293',
              },
            },
            "& .MuiPaginationItem-icon": {
              fontSize: "2rem", // ⬅️ حجم السهم هنا
            },
          }}
          count={count}
          page={page}
          onChange={onPageChange}
        />
      </Stack>

      {isPending && <CircularProgress size={24} />}
    </Box>
  );
}
