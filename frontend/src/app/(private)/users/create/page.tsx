'use client';

import api from "@/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip } from "@mui/material";
import { DatePicker, DateValidationError, LocalizationProvider, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface IUserRegister {
    name: string;
    password: string;
    email: string;
    birthdate: string | Date;
}

export default function CreateUser() {

    const [isShowingPassword, setIsShowingPassword] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [registerForm, setRegisterForm] = useState<IUserRegister>({
        name: '',
        password: '',
        email: '',
        birthdate: '',
    });
    const { push } = useRouter();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function handleRegisterFormChange(e: any) {

        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const name = target.name;
        const value = target.value;

        setRegisterForm({
            ...registerForm,
            [name]: value
        });
    }

    function handleSubmit() {
        setIsLoadingSubmit(true);

        if (typeof window !== 'undefined') {
            api.post<void>('/user', {
                ...registerForm
            })
                .then(response => {

                    enqueueSnackbar({
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        message: 'Usuário criado com sucesso',
                        variant: 'success',
                        preventDuplicate: true,
                        autoHideDuration: 800
                    });

                    push('/');
                })
                .catch(error => {
                    console.error(error);

                    const errors: string[] = error.response?.data?.message ?? [];

                    errors.forEach(messageError => {
                        enqueueSnackbar({
                            anchorOrigin: { vertical: 'top', horizontal: 'center' },
                            message: messageError,
                            variant: 'error',
                            transitionDuration: 2000,
                            preventDuplicate: true
                        });
                    })


                })
                .finally(() => {
                    setIsLoadingSubmit(false);
                });
        }
    }

    function onDataPickerChange(value: string | null, context: PickerChangeHandlerContext<DateValidationError>) {
        setRegisterForm({ ...registerForm, birthdate: new Date(value || '') });
    }

    function handleShowPassword() {
        setIsShowingPassword(!isShowingPassword);
    }

    return (
        <section className="w-full h-[70vh] flex items-center justify-center">
            <div className="max-w-[500px] w-full p-6 bg-slate-50 rounded m-2">
                <Button onClick={() => push('/auth')} className="absolute left-0 top-4">
                    <Tooltip title="Voltar">
                        <ArrowBackIcon />
                    </Tooltip>
                </Button>
                <h2 className='flex items-center justify-center'>
                    Cadastro de usuário.
                </h2>
                <form className='flex flex-col gap-2'>
                    <TextField disabled={isLoadingSubmit} required name="name" type='text' id="name" label="Nome" variant="outlined" onChange={(e) => handleRegisterFormChange(e)} value={registerForm.name} />

                    <TextField disabled={isLoadingSubmit} required name="email" type='email' id="email" label="E-mail" variant="outlined" onChange={(e) => handleRegisterFormChange(e)} value={registerForm.email} />

                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
                        <OutlinedInput
                            name="password"
                            type={isShowingPassword ? 'text' : 'password'}
                            id="password"
                            label="Senha"
                            onChange={handleRegisterFormChange}
                            value={registerForm.password}
                            disabled={isLoadingSubmit} required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Mudar visibilidade da senha"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleShowPassword}
                                        edge="end"
                                    >
                                        {isShowingPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker format="DD/MM/YYYY" disabled={isLoadingSubmit} onChange={onDataPickerChange} label="Data de nascimento" className="w-full" />
                        </DemoContainer>
                    </LocalizationProvider>

                    <div>
                        <Button disabled={isLoadingSubmit || Object.values(registerForm).includes('')} onClick={handleSubmit} className='w-full h-[45px]' variant="contained" color='primary'>
                            {isLoadingSubmit
                                ? <>
                                    <CircularProgress size={20} />

                                </>
                                : 'Cadastrar'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}