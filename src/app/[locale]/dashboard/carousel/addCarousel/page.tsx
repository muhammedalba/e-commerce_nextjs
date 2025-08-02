"use client";
import { useCreateCarousel } from "@/lib/API/hooks/useCarousel";
import { useTranslations } from "next-intl";
import CarouselForm from "../../components/CarouselForm";

export default function Page() {
  const t = useTranslations("Carousel");
  const { mutate:createCarousel, isPending } = useCreateCarousel();

  return (
    <CarouselFo
    rm
      formType="create"
      onCreate={createCarousel} // from useCreateCarousel().mutate
      onUpdate={() => {}}
      isPending={isPending}
      
      t={t}
    />
  );
}
