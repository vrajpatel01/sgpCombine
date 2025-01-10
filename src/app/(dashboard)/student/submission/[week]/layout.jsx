"use client";
import { usePathname } from "next/navigation";

export default function WeekLayout({ children }) {
  const pathname = usePathname();
  const activeWeek = pathname.split("/")[3];
  const week = RegExp("^week-[1-9][0-9]*$");
  if (!week.test(activeWeek)) {
    return null;
  }

  return <div>{children}</div>;
}
