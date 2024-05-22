import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// app/layout.tsx
import { Providers } from "./providers";
import NavbarHead from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faceless-avatar ",
  description: " Create Your Avatar! 🎨✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <link rel="icon" href="fav.png" sizes="any" />
      <meta property="og:image" content="/og.jpg" />
      <meta
        property="og:image:alt"
        content="faceless avatar- create yourn own avataar"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <body className={inter.className}>
        <Providers>
          <NavbarHead />
          {children}
        </Providers>
      </body>
    </html>
  );
}
