'use client';

import * as React from 'react';
import { useState } from 'react';

import { useRouter } from "next/navigation"; // To move between tabs

//Components MUI
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Grid2,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

//Icons import
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import CheckIcon from '@mui/icons-material/Check';

import axios from 'axios';

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); //function to redirect "Don't have an account? Sign Up" 
  
  const passwordRequirements = [
    { text: "Mínimo de 8 caracteres", regex: /.{8,}/ }, 
    { text: "Mínimo una mayúscula", regex: /[A-Z]/ }, 
    { text: "Mínimo un número", regex: /[0-9]/ }, 
    { text: "Mínimo un caracter especial", regex: /[!@#$%^&*(),.?":{}|<>]/ }, 
  ];

  const checkRequirement = (r) => r.regex.test(password);

  const CreateUser = async () => {
    try { const response = await axios.post('http://127.0.0.1:8000/api/v1/users', 
      { email: email, password: password }, 
      { headers: { 'Content-Type': 'application/json' } }); 
      console.log('User created:', response.data);
      // set local storage
      localStorage.setItem('user', JSON.stringify(response.data.email));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userID', response.data._id);
      // redirect to home page
      router.push("/cart");
    }
    catch (e) {
      switch (e.response.status) {
        case 401:
        case 402:
            alert('Credenciales inválidas');
            break;
        case 403:
            alert('El usuario ya existe');
            break;
        case 404:
            alert('Usuario no encontrado');
            break;
        case 501:
            alert('Error de servidor');
        default:
            console.log(e.response.data);
            break;
       } 
    }
  };

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior.
    e.preventDefault();

    if(email === '' || password === '') {
      return;
    }

    CreateUser();
  };



  const handleSI = () => { // "Don't have an account? Sign Up"
    router.push("/signIn");
  };

  return (
    <Box        
      sx={{
        minHeight: 'flex',
        p: 3,
      }}
    >
      <Container maxWidth='lg'>
        <Grid2 sx={{mb: 8}}>
          <Box align={"center"}>
              <Typography variant='h2' >
                  Unete Clarity-AI
              </Typography>
          </Box>
        </Grid2>
        <Grid container alignItems={"center"} spacing={10}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FavoriteTwoToneIcon
                  color='secondary'
                  sx={{
                      mr: 1,
                      fontSize: 50,
                      '&:hover': {
                        transform: 'scale(1.2)',
                      } }}
                />
                <Box>
                  <Typography variant='h5' sx={{color: "text.dark"}}>Prioriza tu bienestar</Typography>
                  <Typography variant='h6' sx={{textAlign:'justify', color: "text.dark"}}>
                    Conecta al instante con nuestro chatbot y especialistas calificados para fortalecer tu salud mental y bienestar integral.
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeTwoToneIcon
                  color='secondary'
                  sx={{
                      mr: 1,
                      fontSize: 50,
                      '&:hover': {
                        transform: 'scale(1.2)',
                      } }}
                />
                <Box>
                  <Typography variant='h5' sx={{color: "text.dark"}}>Disponible cuando más lo necesitas</Typography>
                  <Typography variant='h6' sx={{textAlign:'justify', color: "text.dark"}}>
                    Accede a nuestra plataforma 24/7, consulta con especialistas en tu área o recibe apoyo inmediato de nuestra avanzada inteligencia artificial.
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HandymanTwoToneIcon
                  color='secondary'
                  sx={{
                      mr: 1,
                      fontSize: 50,
                      '&:hover': {
                        transform: 'scale(1.2)',
                      } }}
                />
                <Box>
                  <Typography variant='h5' sx={{color: "text.dark"}}>Tecnología diseñada para ayudarte</Typography>
                  <Typography variant='h6' sx={{textAlign:'justify', color: "text.dark"}}>
                    Nuestra IA, cuidadosamente entrenada y en constante evolución, está aquí para ofrecerte el mejor servicio y apoyo personalizado.
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TipsAndUpdatesTwoToneIcon
                color='secondary'
                  sx={{
                      mr: 1,
                      fontSize: 50,
                      '&:hover': {
                        transform: 'scale(1.2)',
                      } }}
                />
                <Box>
                  <Typography variant='h5' sx={{color: "text.dark"}}>Innovación para transformar vidas</Typography>
                  <Typography variant='h6' sx={{textAlign:'justify', color: "text.dark"}}>
                    Aprovecha el poder de las herramientas digitales para acercar la salud mental a más personas y generar un impacto positivo en la comunidad.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/*Right Column*/}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 6, borderRadius: 2, bgcolor: 'primary.main', boxShadow: 3 }}>
              <Typography mb={6} variant='h2' color='white' sx={{ textAlign: 'center' }}>
                Registrate
              </Typography>
              <form onSubmit={handleSubmit} >
                <TextField
                  label={<Typography variant='h6' color='white'>Correo electrónico</Typography>}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  size='small'
                  sx={{
                    '& .MuiFormLabel-asterisk': {
                      display: 'none',
                    },

                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "background.default",
                        borderWidth: "2px",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "secondary.main",
                          borderWidth: "3px",
                        },
                      },
                      "&:hover:not(.Mui-focused)": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "secondary.dark",
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    },

                    "& .MuiInputLabel-outlined": {

                      "&.Mui-focused": {
                        color: "text.light",
                        fontWeight: "bold",
                      },
                    },
                  }}
                />
                <TextField
                  label={<Typography variant='h6' color='white'>Contraseña</Typography>}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  size='small'
                  sx={{
                    mb: 0,
                    '& .MuiFormLabel-asterisk': {
                      display: 'none',
                    },

                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "background.default",
                        borderWidth: "2px",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "secondary.main",
                          borderWidth: "3px",
                        },
                      },
                      "&:hover:not(.Mui-focused)": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "secondary.dark",
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    },

                    "& .MuiInputLabel-outlined": {

                      "&.Mui-focused": {
                        color: "text.light",
                        fontWeight: "bold",
                      },
                    },
                  }}
                />

                <List
                  size='sm'
                  sx={{
                    mb: 2,
                  }}
                > {
                passwordRequirements.map((req, index) => (
                  <ListItem key={index}> 
                    <ListItemIcon sx={{ color: 'secondary.main' }}> 
                      {checkRequirement(req) ? <CheckIcon/> : null} 
                    </ListItemIcon> 
                  <ListItemText primary={<Typography color='white'>{req.text}</Typography>} /> 
                  </ListItem>))
                } 
                </List>
                

                <FormControlLabel
                  control={
                    <Checkbox 
                      required
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography mt={3}  variant='h6' color='white'>
                      Acepto los Términos y Condiciones
                    </Typography>
                  }
                  sx={{
                    '& .MuiTypography-body1': {
                      color: 'text.light',
                    },
                  }}
                />

                <Button type="submit" variant='contained' color='secondary' fullWidth>
                  Registrarse
                </Button>
              </form>
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' align='center' color='white'>
                  ¿Ya tiene una cuenta? {' '}
                  <Typography component='span' color='secondary' sx={{ cursor: 'pointer' }} onClick={handleSI} >Iniciar Sesión</Typography>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;
