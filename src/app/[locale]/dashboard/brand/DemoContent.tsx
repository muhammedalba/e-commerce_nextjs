"use client";
import { useGetAllBrands } from "@/hooks/useBrands";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DemoContent() {
  const { data, isError, error, isSuccess } = useGetAllBrands(1, 10, "dasas");
  if (isError) return <p>حدث خطأ: {String(error)}</p>;
  const brands = data?.data ?? [];
  // console.log("Brands Data:", brands);
  // console.log(error, "Error brands:");

  if (!brands.length && isSuccess) return <p>لا توجد علامات تجارية متاحة.</p>;

  return (
    <div>
      <div className="body-root-inner">
        {/* vendor-grid-top-area start */}
        <div className="vendor-grid-top-search-area">
          <h5 className="title">Our Brand</h5>
          <form action="#" className="input-area-search-head-vendor">
            <input
              type="text"
              placeholder="Search vendors (by name or ID)..."
            />
            <a href="#" className="rts-btn btn-primary radious-sm with-icon">
              <div className="btn-text">Search</div>
              <div className="arrow-icon">
                <i className="fa-light fa-magnifying-glass" />
              </div>
              <div className="arrow-icon">
                <i className="fa-light fa-magnifying-glass" />
              </div>
            </a>
          </form>
        </div>
        {/* vendor-grid-top-area end */}
        <div className="vendor-list-main-wrapper">
          <div className="card-body">
            {/* rts brand area start */}
            <div className="rts-brtand-area-main">
              <div className="row g-4">
                {brands.map((brand) => (
                  <div
                    key={brand._id}
                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                  >
                    <div className="single-brand-area-start">
                      <div className="logo">
                        <Image
                          width={150}
                          height={150}
                          property="image"
                          src={brand.image}
                          alt={brand.name}
                          className="img-fluid"
                        />
                      </div>
                      <p className="item">
                        <Link href={brand.name}>{brand.name}</Link>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* rts brand area end */}
          </div>
        </div>
        {/* bottom footer areas start */}
        <div className="footer-copyright">
          <div className="left">
            <p>Copyright © 2025 All Right Reserved.</p>
          </div>
          <ul>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
        {/* bottom footer areas end */}
      </div>
    </div>
  );
}

export default DemoContent;
