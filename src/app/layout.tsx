import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rifa Siera Code | TecNM Zongolica",
  description: "Apoya al equipo Siera Code del TecNM Zongolica en su participación al HackaTec Nacional 2025. Sitio oficial de rifa digital.",
  keywords: ["rifa", "TecNM", "Zongolica", "Siera Code", "HackaTec", "tecnológico"],
  authors: [{ name: "Siera Code Team" }],
  openGraph: {
    title: "Rifa Siera Code | TecNM Zongolica",
    description: "Apoya al equipo Siera Code del TecNM Zongolica en su participación al HackaTec Nacional 2025",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`min-h-screen bg-background text-foreground antialiased ${inter.className}`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
