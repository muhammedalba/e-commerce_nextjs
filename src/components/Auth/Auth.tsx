"use client";
import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

const AuthComponent = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { mutate: logout, error } = useLogout();

  const [name, setName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const cookieName = decodeURIComponent(Cookies.get("name") || "none");
    const cookieAvatar = decodeURIComponent(Cookies.get("avatar") || "none");
    setName(cookieName);
    setAvatar(cookieAvatar);
  }, []);


  const handleLogout = useCallback(() => {
    logout(undefined, {
      onSuccess() {
        console.log("Logout successful");
        toast.success("Logout successful");
        // router.replace("/");
      },
      onError(err) {
        console.log("Logout successful");
        const message = err.message || t("login.errorLogin");
        toast.error(message);
      },
    });
  }, [logout, router, t]);

  const isLoggedIn = useMemo(() => {
    return name !== null && name !== "none";
  }, [name]);

  if (name === null) return null;

  return (
    <div className="btn-border-only account">
      <ul className="nav-h_top language p-0">
        <li className="category-hover-header language-hover">
          <i className="fa-light fa-user pe-3" />
          <ul className="category-sub-menu">
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/account">
                    <span className="text-capitalize">{name}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/account">account</Link>
                </li>
                <li className="p-4">
                  <Link href="/" onClick={handleLogout}>
                    logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">login</Link>
                </li>
                <li>
                  <Link href="/register">register</Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

// ✅ تغليف المكون بـ React.memo لمنع إعادة الرندر غير الضروري
const Auth = memo(AuthComponent);

export default Auth;
