import Header from "@/components/header/Header";
import ShortService from "@/components/service/ShortService";
import CheckOutMain from "./CheckOutMain";
import FooterOne from "@/components/footer/FooterOne";

export default function Home() {
  return (
    <div className="demo-one">
      <Header />

      <CheckOutMain />
      <ShortService />
      <FooterOne />
    </div>
  );
}
