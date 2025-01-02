"use client";
import type { Metadata } from "next";
import Header from "./header";
import Menu from "./menu";
import Footer from "./footer";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "../redux/StoreProvider";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname)
  if( pathname === "/login") 
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
      {children}
        </body>
        </html>

  )
  else 
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
              <Header />
              <Menu />
              {children}
              <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
