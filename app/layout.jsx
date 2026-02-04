import { Outfit } from "next/font/google";
import Providers from "@/app/Providers";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "FLASH ⚡ MAN - Shop smarter",
    description: "FLASH ⚡ MAN - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
