"use client";

import Link from "next/link";

interface SocialAuthButtonsProps {
  title?: string;
  haveAccountText?: string;
  goLoginText?: string;
  forgotPassword?: string;
  forgetText?: string;
  authLink?: string;
  forgetLink?: string;
}

export default function SocialAuthButtons({
  title = "Or register with",
  haveAccountText = "Have an account?",
  goLoginText = "Go to login",
  forgotPassword,
  forgetText,
  forgetLink,
  authLink
}: SocialAuthButtonsProps) {
  return (
    <div className="another-way-to-registration mt-4 text-center">
      <div className="registradion-top-text">
        <span>{title}</span>
      </div>
      <div className="login-with-brand d-flex gap-3 justify-content-center mb-3">
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
          className="single"
          aria-label="Login with Google"
        >
          <img src="/assets/images/form/google.svg" alt="Google login" />
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/facebook`}
          className="single"
          aria-label="Login with Facebook"
        >
          <img src="/assets/images/form/facebook.svg" alt="Facebook login" />
        </Link>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p className="mt-3">
          {haveAccountText} <Link href={`/${authLink}`}>{goLoginText}</Link>
        </p>
        <p className="mt-3 p-0">
          {forgotPassword} <Link href={`/${forgetLink}`}>{forgetText}</Link>
        </p>
      </div>
    </div>
  );
}
