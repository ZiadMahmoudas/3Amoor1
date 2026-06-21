import type { Metadata } from "next";
import WorksPage from "@/app/components/pages/WorksPage";

export const metadata: Metadata = {
  title: "أعمالنا | Hook Agency",
  description: "نماذج من أعمال هوّك Hook Agency في التسويق الرقمي وتصميم المواقع والمتاجر والحملات الإعلانية.",
};

export default function Page() {
  return <WorksPage />;
}
