import Typography from "@mui/material/Typography";
import React from "react";

type Props = {
  page: number;
  results: number | undefined;
  t: (key: string) => string;
  className?: string | undefined;
};

const PageStatus = React.memo(function PageStatus({
  page,
  results,
  t,
  className,
}: Props) {
  return (
    <div
      className={`d-flex align-items-center justify-content-between px-4 ${className}`}
    >
      <Typography variant="h4">
        {t("page")} : {page}
      </Typography>
      <Typography variant="h4">
        {t("result")} : {results}
      </Typography>
    </div>
  );
});

export default PageStatus;
