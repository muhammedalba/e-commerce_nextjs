"use client";
import { useTranslations } from "next-intl";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Cookies from "js-cookie";
import HeaderOne from "@/components/header/HeaderOne";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import NavigationArea from "@/components/NavigationBreadcrumb/NavigationBreadcrumb";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import RegisterForm from "@/components/forms/RegisterForm";



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
                <div className="d-flex flex-column align-items-center">
                  <Image
                    src={"/assets/images/logo/fav.png"}
                    alt="avatar"
                    width={160}
                    height={160}
                  />
                  <h3 className="title my-4">{t("register.title")}</h3>
                </div>
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
