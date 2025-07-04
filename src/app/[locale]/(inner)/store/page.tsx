import Header from "@/components/header/Header";
import StoreBanner from "@/components/banner/StoreBanner";
import StoreLocation from "@/components/common/StoreLocation";
import ShortService from "@/components/service/ShortService";

import FooterOne from "@/components/footer/FooterOne";

export default function Home() {
  return (
    <div className="demo-one">
      <Header />
      <StoreBanner />
      <StoreLocation />
      <ShortService />

      <FooterOne />
    </div>
  );
}
