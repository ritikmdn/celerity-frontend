import "@/styles/tailwind.css";
import "@/styles/prosemirror.css";

import cx from "classnames";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Toaster from "./toaster";
import { ReactNode } from "react";

const title =
  "Celerity - AI sense checker";
const description =
  "Celerity is an AI sense checker that ensures what you write is coherent with your project data.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@ritik_mdn11",
  },
  metadataBase: new URL("https://www.waffle.ink"),
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Toaster />
      <body className={cx(cal.variable, inter.variable)}>{children}</body>
      <Analytics />
    </html>
  );
}
