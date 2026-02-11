import type { Metadata } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dayanna Vivanco | Psicóloga Clínica",
  description:
    "Psicóloga clínica especializada en terapia individual, de pareja, ansiedad, depresión y bienestar emocional. Agenda tu consulta hoy.",
  keywords: [
    "psicóloga",
    "psicología clínica",
    "terapia",
    "ansiedad",
    "depresión",
    "bienestar emocional",
    "salud mental",
    "Dayanna Vivanco",
  ],
  openGraph: {
    title: "Dayanna Vivanco | Psicóloga Clínica",
    description:
      "Transforma tu bienestar emocional. Psicóloga clínica con enfoque personalizado.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
