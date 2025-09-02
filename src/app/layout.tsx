// src/app/layout.tsx
import { Montserrat, Merriweather } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import prisma from '@/lib/prisma';
import { getCurrentUserId } from './_actions/auth';


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Universal Ecommerce",
  description: "A modern ecommerce showcase built with Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true }
  });
  const currentUserId = getCurrentUserId();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${merriweather.variable} bg-off-white text-charcoal font-merriweather dark:bg-charcoal dark:text-off-white`}
      >
        <AppProviders currentUserId={currentUserId} users={users}>{children}</AppProviders>
      
      </body>
    </html>
  );
}
