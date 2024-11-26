"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  // Creamos una paleta de colores personalizada
  palette: {
    primary: {
      // Azul oscuro (para destacar elementos principales)
      main: '#004d66',
    },
    secondary: {
      // Verde brillante (armoniza con las hojas)
      main: '#2ba84a',
    },
    accent: {
      // Azul claro (para fondos o detalles suaves)
      main: '#80d6ff',
    },
    background: {
      // Blanco suave o gris claro (para fondo general)
      default: '#f0f4f8',
    },
    text: {
      // Gris oscuro para textos
      primary: '#333333',
      secondary: '#666666',
    },
  },  
  // Añadimos una familia de fuentes
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});
