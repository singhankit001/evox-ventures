import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/layout/FinalCTA';
import CustomCursor from '@/components/ui/CustomCursor';
import Chatbot from '@/components/ui/Chatbot';
import ClientProviders from '@/components/ui/ClientProviders';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800', '900'],
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
                <ClientProviders>
                    <CustomCursor />
                    <Navbar />
                    <main style={{ minHeight: '100vh' }}>{children}</main>
                    <FinalCTA />
                    <Footer />
                    <Chatbot />
                </ClientProviders>
            </body>
        </html>
    );
}
