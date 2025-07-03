import HeaderOne from "@/components/header/HeaderOne";
import NavigationArea from "@/components/NavigationBreadcrumb/NavigationBreadcrumb";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ForgotPasswordForm from "@/components/forms/ForgetPassForm";




export default function ForgotPassword() {
  const t = useTranslations("Auth");
  const Breadcrumbs = [
    { label: t("forgotPassword.title"), href: "/forgotPassword", active: true },
  ];

  return (
    <div className="">
      <HeaderOne />
      <NavigationArea breadcrumbs={Breadcrumbs} />

      <div className="bg_light-1 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="registration-wrapper-1">
             
                <div className="logo-area mb--0 text-center">
                  <Image
                    width={150}
                    height={150}
                    priority
                    className="mb--10"
                    src="/assets/images/logo/fav.png"
                    alt="logo"
                  />
                </div>
                <h3 className="title text-center">
                  {t("forgotPassword.title")}
                </h3>
              <ForgotPasswordForm/>
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
