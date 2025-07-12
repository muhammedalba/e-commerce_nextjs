"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CategoryMenu from "./CategoryMenu";
import { useCompare } from "./CompareContext";
import WishList from "./WishList";

import Auth from "../Auth/Auth";
import CartDropdown from "./Cart";

function MidBar() {
  const { compareItems } = useCompare();

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestions = [
    "Profitable business makes your profit Best Solution",
    "Details Profitable business makes your profit",
    "One Profitable business makes your profit",
    "Me Profitable business makes your profit",
    "Details business makes your profit",
    "Firebase business makes your profit",
    "Netlyfy business makes your profit",
    "Profitable business makes your profit",
    "Valuable business makes your profit",
    "System business makes your profit",
    "Profitables business makes your profit",
    "Content business makes your profit",
    "Dalivaring business makes your profit",
    "Staning business makes your profit",
    "Best business makes your profit",
    "cooler business makes your profit",
    "Best-one Profitable business makes your profit",
    "Super Fresh Meat",
    "Original Fresh frut",
    "Organic Fresh frut",
    "Lite Fresh frut",
  ];

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = allSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`/shop?search=${encodeURIComponent(suggestion)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    } else {
      router.push("/shop");
    }
  };
  return (
    <div className="search-header-area-main py-3">
      <div className="container ">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="logo-search-category-wrapper ">
              <Link href="/" className="logo-area">
                <Image
                  width={50}
                  height={50}
                  src="/assets/images/logo/fav.png"
                  // src="/assets/images/logo/logo-01.svg"
                  alt="logo-main"
                  priority
                  // className="logo"
                />
              </Link>
              <div className="category-search-wrapper">
                <div className="category-btn category-hover-header">
                  <img
                    className="parent"
                    src="/assets/images/icons/bar-1.svg"
                    alt="icons"
                  />
                  <span>Categories</span>
                  <CategoryMenu />
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="search-header"
                  autoComplete="off"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for products, categories or brands"
                    required
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() =>
                      searchTerm.length > 0 && setShowSuggestions(true)
                    }
                  />
                  <button
                    type="submit"
                    className="rts-btn btn-primary radious-sm with-icon"
                  >
                    <div className="btn-text">Search</div>
                    <div className="arrow-icon">
                      <i className="fa-light fa-magnifying-glass" />
                    </div>
                  </button>

                  {/* Autocomplete dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <ul
                      className="autocomplete-suggestions"
                      style={{
                        position: "absolute",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        marginTop: "4px",
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 1000,
                        listStyleType: "none",
                        padding: 0,
                        borderRadius: "4px",
                      }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                          }}
                          onMouseDown={(e) => e.preventDefault()} // prevent input blur
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
              </div>
              <div className="actions-area">
                <div className="search-btn" id="searchs">
                  <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 2 H15 V14 H2 Z" fill="#1F1F25" />
                  </svg>
                </div>
                <div className="menu-btn" id="menu-btn">
                  <svg
                    width={20}
                    height={16}
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y={14} width={20} height={2} fill="#1F1F25" />
                    <rect y={7} width={20} height={2} fill="#1F1F25" />
                    <rect width={20} height={2} fill="#1F1F25" />
                  </svg>
                </div>
              </div>
              <div className="accont-wishlist-cart-area-header">
                <Auth />
                <Link
                  href="/shop-compare"
                  className="btn-border-only account compare-number"
                >
                  <i className="fa-regular fa-code-compare" />
                  <span className="number">{compareItems.length}</span>
                </Link>
                <WishList />
                <CartDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MidBar;
