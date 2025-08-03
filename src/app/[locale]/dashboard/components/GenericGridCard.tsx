import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import { BrandType, CarouselType } from "@/types";

interface GenericGridProps {
  data: BrandType | CarouselType;
  onDelete: (id: string) => void;
  isPending: boolean;
  editBrand?: string;
  deleteBrand?: string;
  loadingDelete?: string;
  module: string; 
  inactive?:string;
  active?:string;
}

const GenericGridComponent = ({
  data,
  onDelete,
  isPending,
  editBrand,
  deleteBrand,
  loadingDelete,
  module,
  inactive,
  active,
}: GenericGridProps) => {
  const isDeleting = isPending;

  if (module === "carousel") {
    const carouselData = data as CarouselType;
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="single-brand-area-start">
          <Link
            href={`/dashboard/${module}/${carouselData.slug}`}
            className="logo"
          >
            <Image
              width={150}
              height={150}
              src={carouselData.carouselSm}
              alt={"carouselSm"}
              className="img-fluid"
              style={{ objectFit: "cover" }}
            />
          </Link>

          <p className="item pt-4">{carouselData.description}</p>

          <p className="item pt-4">
            {carouselData.isActive ? active : inactive}
          </p>

          <div className="d-flex align-item-center justify-content-between">
            <Tooltip
              title={isDeleting ? loadingDelete : deleteBrand || "حذف"}
              slotProps={{
                tooltip: {
                  sx: { fontSize: "1.3rem", padding: "8px" },
                },
              }}
            >
              <span>
                <button
                  className="w-auto text-danger p-3 rounded rounded-2"
                  type="button"
                  aria-label={deleteBrand || "حذف"}
                  disabled={isDeleting}
                  onClick={() => onDelete(carouselData._id)}
                >
                  <i className="fa-solid fa-trash-xmark fs-3"></i>
                </button>
              </span>
            </Tooltip>

            <Tooltip
              title={editBrand || "تعديل"}
              slotProps={{
                tooltip: {
                  sx: { fontSize: "1.3rem", padding: "8px" },
                },
              }}
            >
              <Link
                href={`/dashboard/${module}/${carouselData._id}`}
                className="text-primary p-3 rounded rounded-2"
              >
                <i className="fa-regular fa-file-pen fs-3"></i>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  } else {
    const brandData = data as BrandType;

    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="single-brand-area-start">
          <Link href={`/dashboard/${module}/${brandData._id}`} className="logo">
            <Image
              width={150}
              height={150}
              src={brandData.image}
              alt={brandData.name || "image"}
              className="img-fluid"
              style={{ objectFit: "cover" }}
            />
          </Link>

          {/* لا يوجد description أو isActive في BrandType */}
          <p className="item pt-4">{brandData.name}</p>

          <div className="d-flex align-item-center justify-content-between">
            <Tooltip
              title={isDeleting ? loadingDelete : deleteBrand || "حذف"}
              slotProps={{
                tooltip: {
                  sx: { fontSize: "1.3rem", padding: "8px" },
                },
              }}
            >
              <span>
                <button
                  className="w-auto text-danger p-3 rounded rounded-2"
                  type="button"
                  aria-label={deleteBrand || "حذف"}
                  disabled={isDeleting}
                  onClick={() => onDelete(brandData._id)}
                >
                  <i className="fa-solid fa-trash-xmark fs-3"></i>
                </button>
              </span>
            </Tooltip>

            <Tooltip
              title={editBrand || "تعديل"}
              slotProps={{
                tooltip: {
                  sx: { fontSize: "1.3rem", padding: "8px" },
                },
              }}
            >
              <Link
                href={`/dashboard/${module}/${brandData.slug}`}
                className="text-primary p-3 rounded rounded-2"
              >
                <i className="fa-regular fa-file-pen fs-3"></i>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
};

export const GenericGridCard = React.memo(GenericGridComponent);
