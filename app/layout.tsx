import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ClientMotionWrapper from '@/components/client-motion-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CV Builder - Create Professional Resumes',
  description: 'Create professional, customizable CVs with our easy-to-use drag and drop builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ClientMotionWrapper>
            {children}
          </ClientMotionWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}