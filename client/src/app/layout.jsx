import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins'
});

export const metadata = {
    title: 'Evox Ventures | Premium Event Management',
    description: 'Expert event management for corporate, sports, and social gatherings.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${poppins.variable}`}>
                <Navbar />
                <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-main)' }}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
