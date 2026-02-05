import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { OrganisationProvider } from "@/context/OrganisationContext";
import { TicketProvider } from "@/context/TicketContext";
import { MemberProvider } from "@/context/MemberContext";
import { AuthGuard } from "@/components/auth/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupportDesk",
  description: "Modern customer support dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <AuthProvider>
          <OrganisationProvider>
            <TicketProvider>
              <MemberProvider>
                <AuthGuard>
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper>
                </AuthGuard>
              </MemberProvider>
            </TicketProvider>
          </OrganisationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
