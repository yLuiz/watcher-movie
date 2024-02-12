'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isAuth, setIsAuth] = useState(true);
  const { push } = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {

        const isThereToken = !!localStorage.getItem('token');
        setIsAuth(isThereToken);
        if (isThereToken) {
            push('/users');
            return;
        }
    }
    }, []);

  return (
    <html lang='pt-br'>
      <body className="bg-slate-900">
        <main className="flex items-center justify-center w-full h-[100vh]">
          {isAuth && null}
          {!isAuth && children}
        </main>
      </body>
    </html>
  );
}
