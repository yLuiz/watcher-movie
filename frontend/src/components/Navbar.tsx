'use client';

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export interface IRoutersList {
    label: string;
    href?: string;
    action?: Function;
    icon?: string;
}

export interface IProps {
    className: string;
}

export default function Navbar({ className }: IProps) {

    const { push } = useRouter();

    const routers: IRoutersList[] = [
        {
            label: 'Filmes',
            href: '/movies'
        },
        {
            label: 'Usuários',
            href: '/users'
        },
        {
            label: 'Sair',
            action: () => {
                localStorage.clear();
                push('/auth');
            }
        }
    ]

    return (

        <nav className={className}>
            <ul className="flex h-full items-center justify-end gap-5 list-none pr-6 m-0">
                {routers.map(router => (
                    <li>
                        {
                            router.href
                                ? <Button 
                                    onClick={() => push(router.href!)}
                                    className='text-[#FFF] no-underline font-bold hover:bg-slate-400 p-2 rounded-md transition-[0.2s]'>
                                        {router.label}
                                </Button>
                                : <button className="text-[#FFF] border-none bg-transparent font-bold outline-none hover:bg-slate-400 p-2 rounded-md transition-[0.2s] cursor-pointer" onClick={() => router.action!()}>{router.label}</button>
                        }
                    </li>
                ))}
            </ul>
        </nav>

    );

}