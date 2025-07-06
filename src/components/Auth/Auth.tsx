"use client";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";

const Auth = () => {
  const name = decodeURIComponent(Cookies.get("name") || "none");
  const avatar = decodeURIComponent(Cookies.get("avatar") || "none");
  console.log(decodeURIComponent(name));
  console.log(decodeURIComponent(avatar));
  const handleLogout = () => {
    console.log("Logout clicked");
  };
  return (
    <div className="btn-border-only account">
      {/* <ul className="nav-h_top language px-1">
        <li className="category-hover-header ">
          <ul className="category-sub-menu">
            <li>
              <Link href="/account">account</Link>
            </li>
            <li>
              <Link href="/login">login</Link>
            </li>
            <li>
              <Link href="/register">register</Link>
            </li>

            <li className="p-4">
              <button type="button" onClick={() => handleLogout()}>
                logout
              </button>
            </li>
          </ul>
        </li>
      </ul> */}
      <ul className="nav-h_top language p-0">
        <li className="category-hover-header language-hover">
          <i className="fa-light fa-user pe-3" />
          <ul className="category-sub-menu ">
            {name !== "none" ? (
              <>
                <li>
                  <Link href="/account">
                    {name !== "none" ? (
                      <span className="text-capitalize">{name}</span>
                    ) : (
                      "Account"
                    )}
                  </Link>
                </li>
                <li>
                  <Link href="/account">account</Link>
                </li>

                <li className="p-4">
                  <Link href="/" onClick={() => handleLogout()}>
                    logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">login</Link>
                </li>
                <li>
                  <Link href="/register">register</Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Auth;
