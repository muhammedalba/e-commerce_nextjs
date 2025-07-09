import BannerOne from "@/components/banner/BannerOne";
import FeatureOne from "@/components/feature/FeatureOne";
import Header from "@/components/header/Header";
import DiscountProduct from "@/components/product/DiscountProduct";
import FeatureProduct from "@/components/product/FeatureProduct";
import WeeklyBestSelling from "@/components/product/WeeklyBestSelling";
import FeatureDiscount from "@/components/product/FeatureDiscount";
import TrandingProduct from "@/components/product/TrandingProduct";
import BlogOne from "@/components/blog/BlogOne";
import FooterOne from "@/components/footer/FooterOne";
// import { CartProvider } from "@/components/header/CartContext";
// import { WishlistProvider } from "@/components/header/WishlistContext";
import { ToastContainer, toast } from "react-toastify";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function Home() {
  // const products = await fetchProductsFromAPI();
  // console.log(products);

  return (
    // <WishlistProvider>
    //   <CartProvider>
    <div className="">
      <Header />
      <BannerOne />
      <FeatureOne />
      <FeatureProduct />
      <DiscountProduct />
      <WeeklyBestSelling />
      <FeatureDiscount />
      <TrandingProduct />
      <BlogOne />
      <FooterOne />
    </div>
    //   </CartProvider>
    // </WishlistProvider>
  );
}
