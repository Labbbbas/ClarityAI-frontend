"use client";

import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="body1" gutterBottom>
        © {new Date().getFullYear()} Clarity AI - Todos los derechos reservados
      </Typography>
      <Box>
        <Link
          href="/about"
          underline="hover"
          color="secondary.main"
          sx={{ mx: 1 }}
        >
          Acerca de
        </Link>
        <Link
          href="/contact"
          underline="hover"
          color="secondary.main"
          sx={{ mx: 1 }}
        >
          Contacto
          </Link>
        <Link
          href="/contact"
          underline="hover"
          color="secondary.main"
          sx={{ mx: 1 }}
        >
          Registro
          </Link>
        <Link
          href="/contact"
          underline="hover"
          color="secondary.main"
          sx={{ mx: 1 }}
        >
          Iniciar Sesión
    
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
