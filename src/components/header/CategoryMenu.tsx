"use client";
import type { Category } from "@/types";
import { useGetAllCategories } from "@/lib/API/hooks/useCategories";
import React, { useState } from "react";
import CategoryItem from "./CategoryItem";

function CategoryMenu() {
  const { data, isLoading, isError, error } = useGetAllCategories();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ: {String(error)}</p>;

  const categories: Category[] = data?.data ?? [];

  return (
    <div>
      <ul className="category-sub-menu" id="category-active-four">
        {categories.map((item, index) => (
          <CategoryItem
            key={item._id}
            item={item}
            index={index}
            isOpen={openIndex === index}
            toggleMenu={toggleMenu}
          />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(CategoryMenu);
