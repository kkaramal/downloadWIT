import { CourseBrowser } from "@/components/CourseBrowser";
import { COURSE_MODULES } from "@/lib/catalog";

export default function Home() {
  return <CourseBrowser modules={COURSE_MODULES} />;
}
