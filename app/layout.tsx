import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { ToasterProvider } from "@/components/providers/toast-provider";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const lexend = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Filmbox",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={lexend.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ConvexClientProvider>
  );
}
