'use client';

import api from '@/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useState } from "react";


export default function Auth() {

    const [authForm, setAuthForm] = useState({
        email: '',
        password: '',
    });

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [isShowingPassword, setIsShowingPassword] = useState(false);
    const { push } = useRouter();

    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

    function handleAuthFormChange(e: any) {

        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const name = target.name;
        const value = target.value;

        setAuthForm({
            ...authForm,
            [name]: value
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) router.push('/users');
    }, []);

    function handleSubmit() {
        setIsLoadingSubmit(true);

        if (typeof window !== 'undefined') {
            api.post<{ access_token: string }>('/auth', {
                ...authForm
            })
                .then(response => {

                    const { access_token } = response.data;

                    localStorage.setItem('token', access_token);
                    enqueueSnackbar({
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        message: 'Logado com sucesso',
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 800
                    });
                    setTimeout(() => {
                        push('/users');
                    }, 1800);
                })
                .catch(error => {
                    console.error(error);
                    enqueueSnackbar({
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        message: 'Credenciais incorretas',
                        variant: 'error',
                        preventDuplicate: true
                    });
                })
                .finally(() => {
                    setIsLoadingSubmit(false);
                });
        }
    }

    function handleShowPassword() {
        setIsShowingPassword(!isShowingPassword);
    }

    const router = useRouter();

    return (

        <section className="max-w-[500px] w-full h-[300px] p-6 bg-slate-50 rounded m-2">
            <h2 className='flex items-center justify-center'>
                Login
                <LoginIcon />
            </h2>
            <form className='flex flex-col gap-2'>
                <TextField required name="email" type='email' id="email" label="E-mail" variant="outlined" onChange={(e) => handleAuthFormChange(e)} value={authForm.email} />

                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
                    <OutlinedInput
                        name="password"
                        type={isShowingPassword ? 'text' : 'password'}
                        id="password"
                        label="Senha"
                        onChange={handleAuthFormChange}
                        value={authForm.password}
                        required
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Mudar visibilidade da senha"
                                    onClick={handleShowPassword}
                                    onMouseDown={handleShowPassword}
                                    edge="end"
                                >
                                    { isShowingPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div>
                    <Button disabled={isLoadingSubmit || (!authForm.email || !authForm.password)} onClick={handleSubmit} className='w-full h-[45px]' variant="contained" color='primary'>
                        {isLoadingSubmit
                            ? <>
                                <CircularProgress size={20} />

                            </>
                            : 'Entrar'
                        }
                    </Button>
                </div>
            </form>
            <div className='w-full'>
                <p>
                    Não possui cadastro? <Link className='text-blue-500' href="auth/create">Clique aqui e registre-se</Link>
                </p>
            </div>
        </section>


    );
}
