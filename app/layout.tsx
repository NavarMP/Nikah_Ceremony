import { Playfair_Display, Lato, Great_Vibes, Anek_Malayalam, Zain } from "next/font/google";
import { Providers } from "./providers";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { NavMenu } from "@/components/NavMenu";
import { MusicPlayer } from "@/components/MusicPlayer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const anekMalayalam = Anek_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
});

const zain = Zain({
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "Binyamin & Nasla - Nikah Ceremony",
  description: "Save the date for the Nikah ceremony of Binyamin Azhari & Nasla Wafiyya.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} ${greatVibes.variable} ${anekMalayalam.variable} ${zain.variable}`}>
        <SmoothScrolling>
          <BackgroundEffects />
          <Providers>
            <NavMenu />
            <MusicPlayer />
            {children}
          </Providers>
        </SmoothScrolling>
      </body>
    </html>
  );
}
