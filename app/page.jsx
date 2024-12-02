"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

export default function Home() {
    const [priceCalm, setPriceCalm] = useState(null);
    const [priceWysa, setPriceWysa] = useState(null); // Nuevo estado para el precio de Wysa

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch('/api/calm');
                if (!response.ok) throw new Error('Error al obtener los datos del servidor');
                const data = await response.json();
                setPriceCalm(data.price);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        const fetchWysaPrice = async () => {
            try {
                const response = await fetch('/api/wysa');
                if (!response.ok) throw new Error('Error al obtener el precio de Wysa');
                const data = await response.json();
                setPriceWysa(data.price); // Actualiza el precio de Wysa
            } catch (error) {
                console.error('Error al obtener el precio de Wysa:', error);
            }
        };

        fetchPrice();
        fetchWysaPrice(); // Llama a la nueva función
    }, []);
  return (
    <Box>
      {/* Sección principal con texto e imagen destacada */}
      <Box
        sx={{
          backgroundColor: "#3BC9D9",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Diseño responsive
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        {/* Texto principal */}
        <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            ¡La tecnología ayuda a la salud mental!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Explora cómo las soluciones digitales pueden ser una herramienta
            poderosa para tu bienestar mental.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3F8C4B",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Descarga
          </Button>
        </Box>

        {/* Imagen principal */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="1.jpg" // Ruta de la imagen
            alt="Salud mental"
            style={{ maxWidth: "50%", height: "auto" }} // Imagen ajustable al tamaño del contenedor
          />
        </Box>
      </Box>

      <div style={{ margin: "10px" }}></div>

      {/* Sección de orientación psicológica */}
      <Grid container alignItems="center" spacing={2}>
        {/* Texto de la solución digital */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "center" }}
          >
            Solución Digital para la Orientación Psicológica Personalizada
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", padding: { xs: 2, md: 4 } }}
          >
            El acceso a la orientación psicológica en México es limitado para muchas personas.
            Nuestra aplicación busca resolver esta problemática ofreciendo un enfoque individualizado
            que recomienda al mejor especialista para cada usuario, basado en su contexto y necesidades.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <img
            src="./2.jpg" // Ruta de la imagen
            alt="Descripción de la imagen"
            style={{ maxWidth: "35%", height: "auto" }}
          />
        </Grid>
      </Grid>

      {/* Espaciado entre secciones */}
      <div style={{ margin: "10px" }}></div>

      {/* Sección de características */}
      <Grid container alignItems="center" spacing={2}>
        {/* Imagen asociada */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <img
            src="./3.jpg" // Ruta de la imagen
            alt="Descripción de la imagen"
            style={{ maxWidth: "35%", height: "auto" }}
          />
        </Grid>
        {/* Texto de las características */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "center" }}
          >
            Características de la APP.
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", padding: { xs: 2, md: 4 } }}
          >
            La app incluye un chatbot interactivo que evalúa el perfil psicológico del usuario para
            recomendarle especialistas, junto con la creación de perfiles personalizados tanto para
            usuarios como para psicólogos. Ofrece filtros avanzados basados en ubicación, nivel
            socioeconómico y certificaciones, las cuales son validadas conforme a las normativas
            legales de México. Además, garantiza la protección de datos y privacidad, e incorpora
            funciones deseables como un mapa interactivo de especialistas, seguimiento del estado de
            ánimo y recordatorios de citas.
          </Typography>
        </Grid>
      </Grid>

      {/* Sección de competencias y diferenciadores */}
      <Box sx={{ textAlign: "center", padding: 4, backgroundColor: "#E8F5E9" }}>
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
          Competencia y Diferenciadores Clave
        </Typography>
        <Grid container spacing={4}>
          {/* Competencia: Woebot */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#AEDFB6",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Woebot
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, textAlign: "justify" }}
              >
                Ofrece apoyo psicológico a través de un chatbot general, pero no
                personaliza recomendaciones de especialistas ni incluye un filtro
                económico o geográfico.
               </Typography>
                          <Box sx={{ textAlign: "center", marginTop: 2 }}>
                              <Typography variant="body2">
                                  Precio: No disponible contacta al proveedor.
                              </Typography>
                          </Box>
            </Paper>
          </Grid>

          {/* Competencia: Wysa */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#AEDFB6",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Wysa
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, textAlign: "justify" }}
              >
                Similar a Woebot, se centra en el bienestar general y apoyo
                emocional, sin opciones de conexión directa con psicólogos
                certificados o validación profesional.
                          </Typography>
                          <Box sx={{ textAlign: "center", marginTop: 2 }}>
                              <Typography variant="body2">
                                  Precio: {priceWysa || "Cargando..."} MXN
                              </Typography>
                          </Box>
            </Paper>
          </Grid>

          {/* Competencia: Headspace */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#AEDFB6",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Headspace
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, textAlign: "justify" }}
              >
                Se enfoca en meditación y mindfulness, pero no aborda necesidades
                específicas de orientación psicológica personalizada ni ofrece
                interacción con especialistas.
                          </Typography>
                          <Box sx={{ textAlign: "center", marginTop: 2 }}>
                              <Typography variant="body2">
                                  Precio: $879,00 MXN
                              </Typography>
                          </Box>
            </Paper>
          </Grid>

          {/* Competencia: Calm */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#AEDFB6",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Calm
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, textAlign: "justify" }}
              >
                La diferencia es que ClarityAI conecta con psicólogos, mientras
                que Calm se centra en meditaciones y mindfulness.
                          </Typography>
                          <Box sx={{ textAlign: "center", marginTop: 2 }}>
                              <Typography variant="body2">
                                  Precio: {priceCalm || "Cargando..."}
                              </Typography>
                          </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
