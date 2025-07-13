// components/SideLeft.tsx
"use client";
import Image from "next/image";
import SideMenu from "./SideMenu";
import Link from "next/link";

interface SideLeftProps {
  collapsed: boolean;
}

function SideLeft({ collapsed }: SideLeftProps) {
  return (
    <div className={`sidebar_left ${collapsed ? "collapsed" : ""}`}>
      <Link href="/dashboard" className="logo m-auto">
        <Image
          src="/assets/images-dashboard/logo/fav.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <SideMenu />
    </div>
  );
}

export default SideLeft;
