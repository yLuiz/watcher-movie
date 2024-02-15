'use client';

import api from "@/api";
import { Button, CircularProgress, TextField, Tooltip } from "@mui/material";
import { DatePicker, DateValidationError, LocalizationProvider, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface IMovieRegister {
    title: string;
    description: string;
    duration: string | number;
    year: string | Date;
    rating: string | number;
}

export default function CreateMovie() {

    const [isShowingPassword, setIsShowingPassword] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [registerForm, setRegisterForm] = useState<IMovieRegister>({
        title: '',
        description: '',
        duration: '',
        year: '',
        rating: '',
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

        setRegisterForm({
            ...registerForm,
            duration: Number(registerForm.duration),
            rating: Number(registerForm.rating),
        })

        if (typeof window !== 'undefined') {
            api.post<void>('/movie', {
                ...registerForm
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then(response => {

                    enqueueSnackbar({
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        message: 'Filme criado com sucesso',
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
        setRegisterForm({ ...registerForm, year: new Date(value || '') });
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
                    Cadastro de Filme.
                </h2>
                <form className='flex flex-col gap-2'>
                    <TextField disabled={isLoadingSubmit} required name="title" type='text' id="title" label="Titulo" variant="outlined" onChange={(e) => handleRegisterFormChange(e)} value={registerForm.title} />

                    <TextField disabled={isLoadingSubmit} required name="description" type='text' id="description" label="Descrição" variant="outlined" onChange={(e) => handleRegisterFormChange(e)} value={registerForm.description} />

                    <TextField disabled={isLoadingSubmit} required name="duration" type='number' id="duration" label="Duração" variant="outlined" onChange={(e) => handleRegisterFormChange(e)} value={registerForm.duration} />

                    <TextField disabled={isLoadingSubmit} required name="rating" type='number' id="rating" label="Classificação indicativa" variant="outlined" onChange={(e) => handleRegisterFormChange(e)} value={registerForm.rating} />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker disabled={isLoadingSubmit} onChange={onDataPickerChange} label="Data de nascimento" className="w-full" />
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
