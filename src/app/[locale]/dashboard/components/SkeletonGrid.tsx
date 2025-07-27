import React, { useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";

interface SkeletonGridProps {
  count?: number;
  width?: number;
  height?: number;
  className?: string;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = React.memo(
  ({ count = 8, width = 200, height = 200, className = "" }) => {
    const skeletonItems = useMemo(() => {
      return Array.from({ length: count }).map((_, i) => (
        <div key={i + "-Skeleton"} className="col-lg-3 col-md-4 col-sm-6 col-12">
          <div className="single-brand-area-start d-flex justify-content-center">
            <Skeleton width={width} height={height} variant="rounded" />
          </div>
        </div>
      ));
    }, [count, width, height]);

    return (
      <div className={`vendor-list-main-wrapper overflow-auto ${className}`}>
        <div className="card-body">
          <div className="rts-brand-area-main">
            <div className="row g-4">{skeletonItems}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default SkeletonGrid;
