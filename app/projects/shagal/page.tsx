import type { Metadata } from "next";
import { ProjectExperience } from "@/components/etalon-site";

export const metadata: Metadata = {
  title: "Шагал — квартиры у Москвы-реки",
  description:
    "Жилой квартал Шагал: квартиры, инфраструктура, ход строительства и способы покупки.",
};

export default function ShagalPage() {
  return <ProjectExperience />;
}
