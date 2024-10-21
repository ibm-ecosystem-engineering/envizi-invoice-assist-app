import './globals.scss';

import { Providers } from './providers';

export const metadata = {
  title: 'Envizi Invoice Assist',
  description: 'Envizi Invoice Assist - Solution Accelerator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
