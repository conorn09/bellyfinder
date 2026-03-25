import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { PurchaseProvider } from "@/context/PurchaseContext";

export const metadata: Metadata = {
  title: "BellyFinder - Subscribe to Belly Creators",
  description: "The home for belly content. Subscribe to your favorite creators.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PurchaseProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </PurchaseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
