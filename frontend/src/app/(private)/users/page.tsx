'use client';

import api from "@/api";
import { IUser } from "@/interfaces/IUser";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export default function Users() {

    const [usersList, setUsersList] = useState<IUser[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns: Column[] = [

        {
            id: 'name',
            label: 'Name',
            minWidth: 100
        },
        {
            id: 'email',
            label: 'E-mail',
            minWidth: 100
        },
        {
            id: 'birthdate',
            label: 'Nascimento',
            minWidth: 100
        }


    ]

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {

        setPage(newPage);
        getUsers({ skip: newPage, take: 5 });

    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {

        const rows = parseInt(event.target.value, 10);
        setRowsPerPage(rows);
        setPage(0);

        if (rows < 1) {
            getUsers();
            return;
        }

        getUsers({ take: rows });



    };

    function getUsers(param?: { skip?: number, take?: number }) {

        const params = param?.take ? param.take > 1 ? {
            skip: param?.skip ?? page,
            take: param?.take ?? (rowsPerPage < 1 ? total : rowsPerPage)
        } : undefined : undefined;

        api.get<{ users: IUser[], total: number }>('/user', {
            params,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },

        })
            .then(response => {

                const { users, total } = response.data;

                setUsersList([...users]);
                setTotal(total);
            })
    }

    useEffect(() => {
        getUsers({ skip: page, take: rowsPerPage });
    }, []);

    return (
        <section className="w-full h-full">
            <header className="flex items-center gap-2">
                <h2
                    className="text-white ml-6"
                >
                    Usuários
                </h2>
                <div>
                    <Button variant="contained">
                        <Link className="text-[#FFF] no-underline font-bold" href={'users/create'}>Adicionar usuário</Link>
                    </Button>
                </div>
            </header>
            <div className="flex items-center justify-center h-full overflow-auto mx-8">
                <div className="flex items-start w-100% px-8">
                    <div className="App">
                        <Box sx={{ overflow: "auto" }}>
                            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                <TableContainer className="w-full" component={Paper}>
                                    <Table sx={{ minWidth: 500 }} aria-label="Tabela de usuários">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(usersList).map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="right">
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="right">
                                                        {new Date(row.birthdate).toLocaleDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                                                    count={total}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    labelRowsPerPage='Linhas por página'
                                                    lang='pt-br'
                                                    aria-label="Linhas por página"
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </div>

                </div>
            </div>

        </section>
    )
}