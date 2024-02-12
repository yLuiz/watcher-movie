'use client';

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [isAuth, setIsAuth] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const isThereToken = !!localStorage.getItem('token');
            setIsAuth(isThereToken);
            if (!isThereToken) {
                push('/auth');
                return;
            }
        }
    }, []);

    return (
        <html lang='pt-br'>
            <body className="bg-slate-800">
                {
                    isAuth && <>
                        <Navbar className='fixed top-0 left-0 bg-slate-950 w-full h-[60px] shadow-md overflow-auto' />
                        <main className="mt-[80px]">
                            {children}
                        </main>
                    </>
                }
                {
                    !isAuth && null
                }


            </body>
        </html>
    );
}
