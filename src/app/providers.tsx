import React from 'react';
import { config } from '@/config';
import { ThemeProvider } from '@/context/theme-context';
import { ConvexClientProvider } from '@/context/convex-context';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ConvexClientProvider>
      <ThemeProvider
        attribute={config.theme.attribute}
        defaultTheme={config.theme.default}
        enableSystem={config.theme.enableSystem}
        disableTransitionOnChange={config.theme.disableTransitionOnChange}
      >
        {children}
      </ThemeProvider>
    </ConvexClientProvider>
  );
}
