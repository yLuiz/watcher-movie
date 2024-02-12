'use client';
import useAuth from '@/hooks/useAuth';
import useCheckPublicRoute from '@/hooks/useCheckPublicRoute';
import { usePathname, useRouter } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isPublicRoute = useCheckPublicRoute(pathname);

  const { push } = useRouter();

  function checkIsAuth() {
    let isAuth = useAuth();

    if (!isAuth && !isPublicRoute) {
      push('/auth');
      return;
    }

    if (pathname === '/') {
      push('/users');
    }
  }


  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkIsAuth();
    }
  })


  return (
    <html lang="pt-br">
      <body>
        <SnackbarProvider maxSnack={2}>
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
