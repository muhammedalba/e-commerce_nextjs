"use client";
import Header from "@/components/header/Header";
import ShortService from "@/components/service/ShortService";
import Accordion from "./Accordion";
import FooterOne from "@/components/footer/FooterOne";

export default function Home() {
  return (
    <div className="demo-one">
      <Header />

      <>
        <Accordion />
      </>

      <ShortService />
      <FooterOne />
    </div>
  );
}
