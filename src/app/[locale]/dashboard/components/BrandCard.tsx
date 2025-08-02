import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import { Brand } from "@/types";
interface BrandCardProps {
  data: Brand;
  onDelete: (id: string) => void;
  isPending: boolean;
  editBrand?: string;
  deleteBrand?: string;
  loadingDelete?: string;
  module: string;
}

const BrandCardComponent = ({
  data,
  onDelete,
  isPending,
  editBrand,
  deleteBrand,
  loadingDelete,
  module,
}: BrandCardProps) => {
  const isDeleting = isPending;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
      <div className="single-brand-area-start">
        <Link href={`/dashboard/${module}/${data.slug}`} className="logo ">
          <Image
            width={150}
            height={150}
            src={data?.image || ""}
            alt={data?.name}
            className="img-fluid"
            style={{ objectFit: "cover" }}
          />
        </Link>
        <p className="item pt-4">{data.name}</p>
        <div className="d-flex align-item-center justify-content-between">
          {/* <IconTooltipButton
            tooltip={t("deleteLabel")}
            iconClass="fa-solid fa-trash-xmark fs-3"
            onClick={onDelete}
            color="error"
            disabled={isLoading}
          /> */}
          <Tooltip
            title={isDeleting ? loadingDelete : deleteBrand || "حذف"}
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
                aria-label={deleteBrand || "حذف"}
                disabled={isDeleting}
                onClick={() => onDelete(data._id)}
              >
                <i className="fa-solid fa-trash-xmark fs-3"></i>
              </button>
            </span>
          </Tooltip>
          <Tooltip
            title={editBrand || "تعديل"}
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
              href={`/dashboard/${module}/${data.slug}`}
              className="text-primary p-3 rounded rounded-2  "
            >
              <i className="fa-regular fa-file-pen fs-3"></i>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export const BrandCard = React.memo(BrandCardComponent);
