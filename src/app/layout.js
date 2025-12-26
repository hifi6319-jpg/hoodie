import { Outfit } from 'next/font/google'
import "./globals.css";

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-main',
    weight: ['300', '400', '600', '700', '800']
})

export const metadata = {
    title: "LUci | Premium Hoodies",
    description: "Wear Your Style With Comfort",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={outfit.className} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
