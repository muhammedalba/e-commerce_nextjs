"use client";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent } from "react";
import type { Category } from "@/types";

type Props = {
  item: Category;
  index: number;
  isOpen: boolean;
  toggleMenu: (index: number) => void;
};

function CategoryItem({ item, index, isOpen, toggleMenu }: Props) {
  const hasSub = item.supCategories?.length > 0;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (hasSub) {
      e.preventDefault();
      toggleMenu(index);
    }
  };

  return (
    <li key={item._id}>
      <Link
        href={`/category/${item.slug}`}
        className="menu-item"
        onClick={handleClick}
        aria-expanded={isOpen}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          loading="lazy"
      //     priority={index === 0}
          style={{ verticalAlign: "middle", objectFit: "cover" }}
        />
        <span>{item.name}</span>
        {hasSub && (
          <i className={`fa-regular ${isOpen ? "fa-minus" : "fa-plus"}`} />
        )}
      </Link>

      {isOpen && (
        <ul className="submenu mm-collapse mm-show">
          {item.supCategories.map((sub) => (
            <li key={sub._id}>
              <Link className="mobile-menu-link" href={`/category/${item.slug}`}>
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default React.memo(CategoryItem);
