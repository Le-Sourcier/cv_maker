import './globals.css';
import type { Metadata } from 'next';
// Removed Inter import from next/font/google
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ClientMotionWrapper from '@/components/client-motion-wrapper';

// const inter = Inter({ subsets: ['latin'] }); // Removed Inter instance

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
      {/* Removed inter.className */}
      <body>
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