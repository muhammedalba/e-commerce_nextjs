"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const locales = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
];
interface LanguagesProps {
  activePopup: string | null;
}

function Languages({ activePopup }: LanguagesProps) {
  console.log("activePopup", activePopup);

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

  return (
    <div
      className={`user_information_main_wrapper slide-down__click language-area d-${
        activePopup === "language" ? "block" : "none"}`}
    
    >
      <ul className="select-language-area">
        {locales.map(({ code, label }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => handleLocaleChange(code)}
              disabled={code === currentLocale}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Languages;
