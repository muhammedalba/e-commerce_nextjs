export function formatPrice(price: number, lang: "ar" | "en"="ar"): string {
  return new Intl.NumberFormat(lang === "en" ?"en-US"  : "ar", {
    style: "currency",
    currency: "SAR",
  }).format(price);
}
