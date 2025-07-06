
import React from "react";
import HeaderNav from "./HeaderNav";
import Sidebar from "./Sidebar";
import BackToTop from "@/components/common/BackToTop";
import TopPar from "./TopBar";
import MidBar from "./MidBar";

function Header() {
  return (
    <>
        <TopPar />
      <div dir="ltr" className="rts-header-one-area-one w-100">
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
