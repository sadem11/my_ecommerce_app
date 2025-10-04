// src/app/layout.tsx
import Providers from '../providers/Providers';
import '../styles/globals.css';

export const metadata = {
  title: 'E-Commerce App',
  description: 'Built with Next.js, Redux, and next-intl',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
