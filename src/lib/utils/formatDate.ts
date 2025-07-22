export default function formatDate(dateString: string, locale: string = "en") {
  const date = new Date(dateString);

  const resolvedLocale: "ar" | "en" = locale.startsWith("ar") ? "ar" : "en";

  return new Intl.DateTimeFormat(resolvedLocale === "ar" ? "ar-EG" : "en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZone: "UTC", // أو "Europe/Berlin" حسب منطقتك
  }).format(date);
}
