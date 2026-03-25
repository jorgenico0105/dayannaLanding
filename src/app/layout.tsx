import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dayanna Vivanco | Psicóloga Infantil",
  description:
    "Psicóloga especializada en niños y familias. Acompañamos el desarrollo emocional, aprendizaje y bienestar de tus hijos. Agenda tu consulta hoy.",
  keywords: [
    "psicóloga infantil",
    "psicología niños",
    "terapia infantil",
    "bienestar emocional niños",
    "ansiedad infantil",
    "salud mental niños",
    "Dayanna Vivanco",
  ],
  openGraph: {
    title: "Dayanna Vivanco | Psicóloga Infantil",
    description:
      "Especialista en el bienestar emocional de niños y familias. Un espacio seguro y divertido para crecer.",
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
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
