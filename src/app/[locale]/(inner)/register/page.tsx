"use client";
import { useTranslations } from "next-intl";
import HeaderOne from "@/components/header/HeaderOne";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import NavigationArea from "@/components/NavigationBreadcrumb/NavigationBreadcrumb";
import Image from "next/image";
import RegisterForm from "@/components/forms/Auth/RegisterForm";
import { motion } from "framer-motion";

export default function Register() {
  const t = useTranslations("Auth");
  const Breadcrumbs = [
    { label: t("register.title"), href: "/register", active: true },
  ];

  // const name = decodeURIComponent(Cookies.get("name") || "none");
  // const avatar = decodeURIComponent(Cookies.get("avatar") || "none");
  // console.log(decodeURIComponent(name));
  // console.log(decodeURIComponent(avatar));
  return (
    <div className="demo-one">
      <HeaderOne />
      <NavigationArea breadcrumbs={Breadcrumbs} />

      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="registration-wrapper-1 ">
                <motion.div
                  className="input-wrapper mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      src="/assets/images/logo/fav.png"
                      alt="logo"
                      width={150}
                      height={150}
                      priority
                    />
                    <h3 className="title my-4">{t("register.title")}</h3>
                  </div>
                </motion.div>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShortService />
      <FooterOne />
    </div>
  );
}
