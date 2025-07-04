"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const locales = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
];

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  // get leChange
  const currentLocale = pathname.split("/")[1];

  const handleLocaleChange = (newLocale: string) => {

    if (newLocale === currentLocale) return;
    // replace leChange
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };
  //create list
  const languageList = useMemo(
    () =>
      locales.map(({ code, label }) => (
        <li key={code} className="p-4">
          <button
            type="button"
            onClick={() => handleLocaleChange(code)}
            disabled={code === currentLocale}
          >
            {label}
          </button>
        </li>
      )),
    [currentLocale]
  );

  return (
    <ul className="nav-h_top language">
      <li className="category-hover-header language-hover">
        <a>{currentLocale.toUpperCase()}</a>
        <ul className="category-sub-menu">{languageList}</ul>
      </li>
      {/* <li>
        <a href="/trackorder">Track Order</a>
      </li> */}
    </ul>
  );
}
