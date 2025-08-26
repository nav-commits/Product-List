import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redHat = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-redhat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={redHat.variable}>
      <body>{children}</body>
    </html>
  );
}
