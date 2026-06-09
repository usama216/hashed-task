import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { StoreProvider } from "@/components/providers/StoreProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "User management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} h-full`}>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <StoreProvider>
          {children}
          <Toaster position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
