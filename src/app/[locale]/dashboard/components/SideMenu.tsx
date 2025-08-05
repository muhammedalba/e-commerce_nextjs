"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
interface MenuItem {
  title: string;
  icon: string;
  children?: { title: string; href: string }[];
  href?: string;
}

const SidebarMenu = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const pathname = usePathname();
  const t = useTranslations("routes");
  const locale = useLocale();
  const menuItems: MenuItem[] = [
    {
      title: t("dashboardRoutes.dashboard"),
      icon: "/assets/images-dashboard/icons/01.svg",
      children: [{ title: t("dashboardRoutes.dashboard"), href: "/dashboard" }],
    },
    {
      title: t("dashboardRoutes.orders"),
      icon: "/assets/images-dashboard/icons/09.svg",
      children: [
        { title: t("dashboardRoutes.orders"), href: "/dashboard/order" },
        { title: t("dashboardRoutes.addOrders"), href: "/dashboard/addOrders" },
        { title: "Order Details", href: "/dashboard/order-details" },
      ],
    },
    {
      title: t("dashboardRoutes.products"),
      icon: "/assets/images-dashboard/icons/02.svg",
      children: [
        {
          title: t("dashboardRoutes.products"),
          href: "/dashboard/products",
        },
        {
          title: t("dashboardRoutes.addProduct"),
          href: "/dashboard/products/addProduct",
        },
      ],
    },
    {
      title: "Vendor",
      icon: "/assets/images-dashboard/icons/04.svg",
      children: [
        { title: "Vendor Grid", href: "/dashboard/vendor-grid" },
        { title: "Vendor List", href: "/dashboard/vendor-list" },
        { title: "Vendor Details", href: "/dashboard/vendor-details" },
        { title: "Create Vendors", href: "/dashboard/create-vendors" },
      ],
    },
    {
      title: "Transactions",
      icon: "/assets/images-dashboard/icons/06.svg",
      href: "/dashboard/transaction",
    },
    {
      title: "Reviews",
      icon: "/assets/images-dashboard/icons/07.svg",
      href: "/dashboard/review",
    },
    {
      title: t("dashboardRoutes.categories"),
      icon: "/assets/images-dashboard/icons/02.svg",
      children: [
        {
          title: t("dashboardRoutes.categories"),
          href: "/dashboard/categories",
        },
        {
          title: t("dashboardRoutes.addCategory"),
          href: "/dashboard/categories/addCategory",
        },
      ],
    },
    {
      title: t("dashboardRoutes.supCategories"),
      icon: "/assets/images-dashboard/icons/02.svg",
      children: [
        {
          title: t("dashboardRoutes.supCategories"),
          href: "/dashboard/supCategories",
        },
        {
          title: t("dashboardRoutes.addSupCategories"),
          href: "/dashboard/categories/addSupCategory",
        },
      ],
    },
    {
      title: t("dashboardRoutes.brands"),
      icon: "/assets/images-dashboard/icons/16.svg",
      children: [
        { title: t("dashboardRoutes.brands"), href: "/dashboard/brands" },
        {
          title: t("dashboardRoutes.addBrand"),
          href: "/dashboard/brands/addBrand",
        },
      ],
    },
    {
      title: t("dashboardRoutes.suppliers"),
      icon: "/assets/images-dashboard/icons/16.svg",
      children: [
        { title: t("dashboardRoutes.suppliers"), href: "/dashboard/suppliers" },
        {
          title: t("dashboardRoutes.addSupplier"),
          href: "/dashboard/suppliers/addSupplier",
        },
      ],
    },
    {
      title: "Payment",
      icon: "/assets/images-dashboard/icons/17.svg",
      href: "/dashboard/payment",
    },
    {
      title: t("dashboardRoutes.users"),
      icon: "/assets/images-dashboard/icons/05.svg",
      children: [
        {
          title: t("dashboardRoutes.addUser"),
          href: "/dashboard/profile-setting",
        },
      ],
    },
    {
      title: "User Profile",
      icon: "/assets/images-dashboard/icons/05.svg",
      children: [
        { title: "Profile Setting", href: "/dashboard/profile-setting" },
        { title: "Log In", href: "/dashboard/log-in" },
        { title: "Registration", href: "/dashboard/registration" },
      ],
    },
    {
      title: t("dashboardRoutes.carousel"),
      icon: "/assets/images-dashboard/icons/05.svg",
      children: [
        { title: t("dashboardRoutes.carousel"), href: "/dashboard/carousel" },
        { title: t("dashboardRoutes.addCarousel"), href: "/dashboard/addCarousel" },
      ],
    },
    {
      title: t("dashboardRoutes.users"),
      icon: "/assets/images-dashboard/icons/05.svg",
      children: [
        { title: t("dashboardRoutes.users"), href: "/dashboard/users" },
        { title: t("dashboardRoutes.addUser"), href: "/dashboard/users/addUser" },
      ],
    },
  ];
  useEffect(() => {
    // Find the index of the menu item that has a child matching the current path
    const activeIndex = menuItems.findIndex((item) => {
      return item.children?.some((child) => {
        return (
          pathname === `${locale}/dashboard${child.href} ` ||
          (child.title === `${locale}/dashboard` && pathname === "/index")
        );
      });
    });

    if (activeIndex !== -1) {
      setOpenIndex(activeIndex);
    }
  }, [pathname]);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <ul className="rts-side-nav-area-left menu-active-parent">
      {menuItems.map((item, index) => {
        const hasSubmenu = !!item.children?.length;
        const isOpen = openIndex === index;

        return (
          <li className="single-menu-item" key={index}>
            {hasSubmenu ? (
              <Link
                href="#"
                className={`with-plus ${isOpen ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(index);
                }}
              >
                <img src={item.icon} alt="icon" className="icon " />
                <p>{item.title}</p>
              </Link>
            ) : (
              <Link href={item.href || "#"}>
                <img src={item.icon} alt="icon" className="icon" />
                <p>{item.title}</p>
              </Link>
            )}

            {hasSubmenu && (
              <ul
                className={`submenu mm-collapse parent-nav ${
                  isOpen ? "mm-show" : ""
                }`}
              >
                {item.children!.map((sub, subIndex) => {
                  const isActive =
                    pathname === `${locale}/dashboard/${sub.href}` ||
                    (sub.title === "dashboard" && pathname === "/index");
                  return (
                    <li key={subIndex}>
                      <Link
                        href={sub.href}
                        className={`mobile-menu-link px-5 ${
                          isActive ? "active" : ""
                        }`}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenu;
