"use client";
import { useGetCarousel, useUpdateCarousel } from "@/lib/API/hooks/useCarousel";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CarouselForm from "../../components/CarouselForm";

export default function Page() {
  const t = useTranslations("Carousel");
  const { slug } = useParams<{ slug: string }>();
  const { data, isError, error, isLoading } = useGetCarousel(slug);
  const {
    mutate: updateCarousel,
    isPending,
    error: updateError,
  } = useUpdateCarousel();

  if (isError) return <p>{t("errorOccurred") + ": " + error.message}</p>;

  return (
    <CarouselForm
      formType="update"
      initialData={data}
      onCreate={() => {}}
      onUpdate={updateCarousel}
      isPending={isPending}
      isLoading={isLoading}
      t={t}
      error={updateError || error}
    />
  );
}
