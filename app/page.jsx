"use client";

import { Box, Typography, Button, Grid, Paper } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box
  sx={{
    backgroundColor: "#3BC9D9",
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, 
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
  }}
>
  {/* Texto */}
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

  {/* Imagen */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img
      src="1.jpg"
      alt="Salud mental"
      style={{ maxWidth: "50%", height: "auto" }} 
    />
  </Box>
</Box>
      <div style={{ margin: '10px' }}></div>

      <Grid container alignItems="center" spacing={2}>
      
  <Grid item xs={12} md={6} >
    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1,textAlign: "center"}}>
      Solución Digital para la Orientación Psicológica Personalizada
    </Typography>
    <Typography variant="body1" sx={{textAlign: "justify", padding: { xs: 2, md: 4 }}}>
    El acceso a la orientación psicológica en México es limitado para muchas personas. 
    Nuestra aplicación busca resolver esta problemática ofreciendo un enfoque individualizado que recomienda 
    al mejor especialista para cada usuario, basado en su contexto y necesidades.
    </Typography>
  </Grid>

  {/* Columna de imagen */}
  <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
    <img
      src="./2.jpg" // 
      alt="Descripción de la imagen"
      style={{ maxWidth: "35%", height: "auto" }}
    />
  </Grid>
</Grid>
<div style={{ margin: '10px' }}></div>
<Grid container alignItems="center" spacing={2}>

  <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
    <img
      src="./3.jpg" // 
      alt="Descripción de la imagen"
      style={{ maxWidth: "35%", height: "auto" }}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1,textAlign: "center"}}>
      Características de la APP.
    </Typography>
    <Typography variant="body1" sx={{textAlign: "justify", padding: { xs: 2, md: 4 }}}>
    La app incluye un chatbot interactivo que evalúa el perfil psicológico del usuario para recomendarle 
    especialistas, junto con la creación de perfiles personalizados tanto para usuarios como para psicólogos. 
    Ofrece filtros avanzados basados en ubicación, nivel socioeconómico y certificaciones, 
    las cuales son validadas conforme a las normativas legales de México. Además, garantiza 
    la protección de datos y privacidad, e incorpora funciones deseables como un mapa interactivo de especialistas, 
    seguimiento del estado de ánimo y recordatorios de citas.
    </Typography>
  </Grid>
</Grid>


  {/* Columna de imagen */}
  <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
    <img
      src="./4.jpg" // Nombre exacto de tu imagen .jpg
      alt="Ilustración relacionada con la salud mental"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  </Grid>


      {/* Competencias y diferenciadores clave */}
      <Box sx={{ textAlign: "center", padding: 4, backgroundColor: "#E8F5E9" }}>
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
          Competencia y Diferenciadores Clave
        </Typography>
        <Grid container spacing={4}>
          {/* Woebot */}
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
            </Paper>
          </Grid>

          {/* Wysa */}
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
            </Paper>
          </Grid>

          {/* Headspace */}
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
            </Paper>
          </Grid>

          {/* Calm */}
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
