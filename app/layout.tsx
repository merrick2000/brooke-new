import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--bricolage-grotesque",
  subsets: ["latin"],
  weight: "500",
});
const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Brooke Collection Prono",
  description:
    "Pronostiquez gratuitement sur les plus grandes compétitions et gagnez des récompenses ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${poppins.variable}`}
    >
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
