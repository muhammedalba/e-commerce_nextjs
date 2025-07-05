'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const MobileMenu = () => {
      const t = useTranslations("routes");
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [openThirdLevelKey, setOpenThirdLevelKey] = useState<string | null>(null);

    const toggleMenu = (index: number) => {
        setOpenMenuIndex(prev => (prev === index ? null : index));
    };

    const toggleThirdMenu = (key: string) => {
        setOpenThirdLevelKey(prev => (prev === key ? null : key));
    };

    return (
        <nav className="nav-main mainmenu-nav mt--30">
            <ul className="mainmenu metismenu" id="mobile-menu-active">

                {/* Home */}
                <li className=''>
                    <a href="/" className="main" > {t("home")}</a>
                </li>

                {/* About */}
                <li><Link className="main" href="/about">{t("about")}</Link></li>

                {/* Pages */}
                <li className={`has-droupdown ${openMenuIndex === 1 ? 'mm-active' : ''}`}>
                    <a href="#" className="main" onClick={() => toggleMenu(1)}>Pages</a>
                    <ul className={`submenu mm-collapse ${openMenuIndex === 1 ? 'mm-show' : ''}`}>
                        <li><Link className="mobile-menu-link" href="/register">{t("register")}</Link></li>
                        <li><Link className="mobile-menu-link" href="/login">{t("login")}</Link></li>
                    </ul>
                </li>

                {/* Shop */}
                <li className="">
                    <Link href="/shop" className="main">{t("products")}</Link>

                </li>


                {/* Contact */}
                <li><Link className="main" href="/contact">   {t("contact")}</Link></li>

            </ul>
        </nav>
    );
};

export default MobileMenu;
