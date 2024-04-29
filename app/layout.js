
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import "react-toastify/dist/ReactToastify.css";
import { CustomProvider } from 'rsuite';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CustomProvider>{children}</CustomProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
