"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "../services/store";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = GeistSans;
const geistMono = GeistMono;

const metadata: Metadata = {
  title: "FHIR Health Information System",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={"FHIR Health Information System"} />
        <title>FHIR Health Information System</title>
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
