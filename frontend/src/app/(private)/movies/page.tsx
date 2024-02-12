'use client';

import api from "@/api";
import { IMovie } from "@/interfaces/IMovie";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center' | 'right' | 'left';
    format?: (value: number) => string;
}

export default function Movies() {

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const columns: Column[] = [
        {
            id: 'title',
            label: 'Titulo',
            align: 'left',
            minWidth: 100
        },
        {
            id: 'description',
            label: 'Descrição',
            align: 'right',
            minWidth: 100
        },
        {
            id: 'duration',
            label: 'Duração',
            align: 'right',
            minWidth: 100
        },
        {
            id: 'year',
            label: 'Ano de lançamento',
            align: 'right',
            minWidth: 100
        },
        {
            id: 'rating',
            label: 'Classificação indicativa',
            align: 'right',
            minWidth: 100
        },
        {
            id: 'actions',
            label: 'Ações',
            align: 'right',
            minWidth: 100
        }
    ]

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        getMovies({ skip: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const rows = parseInt(event.target.value, 10);
        setRowsPerPage(rows);
        setPage(0);

        if (rows < 1) {
            getMovies();
            return;
        }

        getMovies({ take: rows });
    };

    function getMovies(params?: { skip?: number, take?: number }) {
        api.get<{ movies: IMovie[], total: number }>('/movie', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                skip: params?.skip ?? 0,
                take: rowsPerPage
            }
        })
            .then(resposne => {
                const { movies, total } = resposne.data;

                setMovies([...movies])
                setTotal(total);

            })
    }

    function handleDelete(id: number) {
        api.delete<void>(`/movie/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }   
        })
        .then(() => {
            getMovies();
        })
        .catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <section className="w-full h-full">
            <header className="flex items-center gap-2">
                <h2
                    className="text-white ml-6"
                >Filmes</h2>
                <div>
                    <Button variant="contained">
                        <Link className="text-[#FFF] no-underline font-bold" href={'movies/create'}>Adicionar filme</Link>
                    </Button>
                </div>
            </header>

            <div className="flex items-center justify-center h-full overflow-auto mx-8">
                <div className="flex-grow max-w-[1700px] w-100% px-8">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
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
                                {(movies).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left" component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {row.description}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {row.duration} Minutos
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {new Date(row.year).getFullYear()}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {row.rating}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            <Button className="h-full" onClick={() => handleDelete(row.id)}>
                                                <Tooltip title='Remover'>
                                                    <DeleteIcon color="error" />
                                                </Tooltip>
                                            </Button>
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

                </div>
            </div>
        </section>
    )
}