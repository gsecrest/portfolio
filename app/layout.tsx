import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glenn Secrest | Senior Enterprise Support Engineer",
  description: "Portfolio of Glenn Secrest, Senior Enterprise Support Engineer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
