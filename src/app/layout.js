import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Providers } from "@/components/layout/Providers";
import CustomCursor from "@/components/ui/CustomCursor";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Md. Nur A Alam | Portfolio",
  description: "Frontend Developer & AI Researcher",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased font-body bg-bg-base text-text-primary`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col pt-20">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Providers>
            <CustomCursor />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ToastContainer theme="dark" position="bottom-right" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}


