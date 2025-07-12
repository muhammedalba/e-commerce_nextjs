
import React from "react";
import HeaderNav from "./HeaderNav";
import Sidebar from "./Sidebar";
import BackToTop from "@/components/common/BackToTop";
import TopPar from "./TopBar";
import MidBar from "./MidBar";
import dynamic from "next/dynamic";

function Header() {
  return (
    <>
        <TopPar />
      <div dir="ltr" className="">
        {/* mid bar logo + search */}
        <MidBar />
        {/* main nav */}
        <HeaderNav />   
      </div>
      <Sidebar />
      <BackToTop />
    </>
  );
}

export default Header;
