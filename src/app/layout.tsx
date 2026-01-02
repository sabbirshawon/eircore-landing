import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EirCore – Learning Management System",
  description:
    "EirCore is a modern Learning Management System designed to deliver, manage, and track digital learning experiences efficiently.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
