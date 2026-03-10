import './globals.css';
import type { Metadata } from 'next';
import CustomCursor from '@/components/ui/CustomCursor';
import BackgroundInteractions from '@/components/ui/BackgroundInteractions';

export const metadata: Metadata = {
  title: 'Portfolio | Karthika S Babu',
  description: 'Premium Portfolio of Karthika S Babu, a Full Stack Developer specializing in high-end, interactive web experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <BackgroundInteractions />
        {children}
      </body>
    </html>
  );
}
