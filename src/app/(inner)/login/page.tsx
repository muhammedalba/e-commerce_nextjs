"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import HeaderOne from "@/components/header/HeaderOne";
import AboutBanner from "@/components/banner/AboutBanner";
import CounterOne from "@/components/counterup/CounterOne";
import AboutOne from "@/components/about/AboutOne";
import Team from "@/components/about/Team";
import ServiceOne from "@/components/service/ServiceOne";
import TestimonilsOne from "@/components/testimonials/TestimonilsOne";
import ShortService from "@/components/service/ShortService";

import FooterOne from "@/components/footer/FooterOne";
import { useLogin } from "@/hooks/useLogin";

import { useFormik } from "formik";
import * as Yup from "yup";

// export default function Home() {
//   const { mutate: login, isPending, error, isError } = useLogin();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   console.log("isPending", isPending);
//   console.log("error", error);
//   console.log("isError", isError);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     login(
//       { email, password },
//       {
//         onSuccess(data) {
//           console.log("تم تسجيل الدخول بنجاح", data);
//           // هنا ممكن تحفظ التوكن أو توجه المستخدم
//         },
//         onError(err) {
//           console.error("خطأ في تسجيل الدخول", err.message);
//         },
//       }
//     );
//   };
//   return (
//     <div className="demo-one">
//       <HeaderOne />

//       <>
//         <div className="rts-navigation-area-breadcrumb bg_light-1">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="navigator-breadcrumb-wrapper">
//                   <a href="index.html">Home</a>
//                   <i className="fa-regular fa-chevron-right" />
//                   <a className="current" href="register.html">
//                     Log In
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="section-seperator bg_light-1">
//           <div className="container">
//             <hr className="section-seperator" />
//           </div>
//         </div>
//         {/* rts register area start */}
//         <div className="rts-register-area rts-section-gap bg_light-1">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="registration-wrapper-1">
//                   <div className="logo-area mb--0">
//                     <img
//                       className="mb--10"
//                       src="assets/images/logo/fav.png"
//                       alt="logo"
//                     />
//                   </div>
//                   <h3 className="title">Login Into Your Account</h3>
//                   <form onSubmit={handleSubmit} className="registration-form">
//                     <div className="input-wrapper">
//                       <label htmlFor="email">Email*</label>
//                       <input
//                         type="email"
//                         placeholder="البريد الإلكتروني"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         id="email"
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="password">Password*</label>
//                       <input
//                         type="password"
//                         placeholder="كلمة المرور"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         id="password"
//                       />
//                     </div>
//                     <button
//                       className="rts-btn btn-primary"
//                       type="submit"
//                       disabled={isPending}
//                     >
//                       {isPending ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
//                     </button>
//                     <div className="another-way-to-registration">
//                       <div className="registradion-top-text">
//                         <span>Or Register With</span>
//                       </div>
//                       <div className="login-with-brand">
//                         <a href="#" className="single">
//                           <img
//                             src="assets/images/form/google.svg"
//                             alt="login"
//                           />
//                         </a>
//                         <a href="#" className="single">
//                           <img
//                             src="assets/images/form/facebook.svg"
//                             alt="login"
//                           />
//                         </a>
//                       </div>
//                       <p>
//                         Don't have Acocut? <a href="/register">Registration</a>
//                       </p>
//                     </div>
//                     {error && (
//                       <p className="login-error-message">
//                         {error.message || "خطأ في تسجيل الدخول"}
//                       </p>
//                     )}
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* rts register area end */}
//       </>

//       <ShortService />
//       <FooterOne />
//     </div>
//   );
// }


export default function Home() {
  const { mutate: login, isPending, error, isError } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string()
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
    }),
    onSubmit: (values) => {
      login(values, {
        onSuccess(data) {
          console.log("تم تسجيل الدخول بنجاح", data);
        },
        onError(err) {
          console.error("خطأ في تسجيل الدخول", err.message);
        },
      });
    },
  });

  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <a href="/">Home</a>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="/login">
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>

      {/* login form area */}
      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="registration-wrapper-1">
                <div className="logo-area mb--0">
                  <img
                    className="mb--10"
                    src="assets/images/logo/fav.png"
                    alt="logo"
                  />
                </div>
                <h3 className="title">Login Into Your Account</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="registration-form"
                >
                  <div className="input-wrapper">
                    <label htmlFor="email">Email*</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="البريد الإلكتروني"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="input-wrapper">
                    <label htmlFor="password">Password*</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="كلمة المرور"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    className="rts-btn btn-primary"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
                  </button>

                  <div className="another-way-to-registration">
                    <div className="registradion-top-text">
                      <span>Or Register With</span>
                    </div>
                    <div className="login-with-brand">
                      <a href="#" className="single">
                        <img src="assets/images/form/google.svg" alt="login" />
                      </a>
                      <a href="#" className="single">
                        <img
                          src="assets/images/form/facebook.svg"
                          alt="login"
                        />
                      </a>
                    </div>
                    <p>
                      Don't have an account? <a href="/register">Register</a>
                    </p>
                  </div>

                  {isError && error && (
                    <p className="login-error-message">
                      {error.message || "خطأ في تسجيل الدخول"}
                    </p>
                  )}
                </form>
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
