import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Поиск по статьям, матчам, клубам и трансферам",
  description:
    "Поиск по архиву статей, аналитических разборов, матчей, клубов и трансферных инсайдов на GOLASON.COM.",
  alternates: {
    canonical: "https://golason.com/search",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
