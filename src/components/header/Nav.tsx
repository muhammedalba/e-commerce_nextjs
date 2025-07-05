"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import LanguageToggle from "../LanguageSwitcher/page";
function NavItem() {
  const t = useTranslations("routes");

  // const name = decodeURIComponent(Cookies.get("name") || "none");
  // const avatar = decodeURIComponent(Cookies.get("avatar") || "none");
  // console.log(decodeURIComponent(name));
  // console.log(decodeURIComponent(avatar));
  return (
    <div>
      <nav className="parent-nav d-flex align-items-center flex-row w-100 justify-content-between">
        <ul>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="/">
              <i className="fa-light fa-house  mx-2"></i> {t("home")}
            </Link>
          </li>
          <li className="parent">
            <Link href="/about"> {t("about")}</Link>
          </li>
          <li className="parent with-megamenu">
            <Link href="/shop"> {t("products")}</Link>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">
              Vendor
            </Link>
            <ul className="submenu">
              <li>
                <Link className="sub-b" href="/vendor-list">
                  Vendor List
                </Link>
              </li>
              <li>
                <Link className="sub-b" href="/vendor-grid">
                  Vendor Grid
                </Link>
              </li>
              <li>
                <Link className="sub-b" href="/vendor-details">
                  Vendor Details
                </Link>
              </li>
            </ul>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">
              Pages
            </Link>
            <ul className="submenu">
              <li>
                <Link className="sub-b" href="/store">
                  Store
                </Link>
              </li>
              <li>
                <Link className="sub-b" href="/invoice">
                  Invoice
                </Link>
              </li>

              <li>
                <Link className="sub-b" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="sub-b" href="/cookies-policy">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link className="sub-b" href="/terms-condition">
                  Terms &amp; Condition
                </Link>
              </li>

            </ul>
          </li>
          <li className="parents">
            <Link target="_blank" href="/dashboard">
              <span className="badge">New</span>
              <i className="fa-sharp fa-light fa-panel-fire mx-2"></i>
              {t("dashboard")}
            </Link>
          </li>
          <li className="parent">
            <Link href="/contact">
              <i className="fa-light fa-headset fs-2xl mx-2"></i>
              {t("contact")}
            </Link>
          </li>
        </ul>
        {/* <div className="nav-sm-left"> */}
        <LanguageToggle />
        {/* </div> */}
      </nav>
    </div>
  );
}

export default NavItem;
