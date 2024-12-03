"use client";

import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation"; 
import axios from 'axios';

const SignIn = ({ onSignIn }) => { // Receive onSignIn as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const FetchUsers = async () => {
        var id = 0;
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/users/login', {
                params: {
                    email: email,
                    password: password
                }
            });
            console.log("usuario login", response)
              id = response.data._id;
              // Set local storage
              localStorage.setItem('user', email);
              localStorage.setItem('userID', id);
              localStorage.setItem('isAuthenticated', 'true');
            if(response.data.email === "admin@gmail.com") {
              router.push("/admin");
              } else {
                // Redirect to home page
                router.push("/");
              }
        } catch (e) {
            switch (e.response.status) {
                case 401:
                case 402:
                    alert('Ccredenciales inválidas');
                    break;
                case 403:
                    alert('Correo electrónico o contraseña inválidas');
                    break;
                case 404:
                    alert('Usuario no encontrado');
                    break;
                default:
                    console.log(e.response.data);
                    break;
            }
        }
    };


    const handleSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        FetchUsers();
    }

    const handleSU = () => {
        router.push("/signUp");
    };    

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
            }}
        >
            <Box pt={5} pb={5}>
                <Container maxWidth="sm" >
                    <Paper elevation={3} sx={{ borderRadius: 3}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: 4,
                            }}
                        >
                            <Typography variant="h3" sx={{ color: 'text.dark', marginBottom: 5 }}>
                                Inicia Sesión
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.dark', marginBottom: 2 }}>
                                ¡Bienvenido de vuelta! 
                            </Typography>
                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <TextField
                                    label="Correo electrónico"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    size='small'
                                    required
                                    margin="normal"
                                    sx={{
                                        color: 'text.dark', 
                                        '& .MuiInputLabel-root': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiFormLabel-asterisk': {
                                            display: 'none',
                                        },
                                    }}
                                />
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    size='small'
                                    required
                                    margin="normal"
                                    sx={{
                                        color: 'text.dark', 
                                        '& .MuiInputLabel-root': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiFormLabel-asterisk': {
                                            display: 'none',
                                        },
                                    }}
                                />
                                <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                                    Iniciar Sesión
                                </Button>
                            </form>
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant='h6' align='center' color='text.dark'>
                                    ¿No tienes una cuenta? {' '}
                                <Typography variant='h6' component='span' color='secondary' sx={{ cursor: 'pointer', '&:hover': {color: 'black'}}} onClick={handleSU}>Registrate</Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default SignIn;