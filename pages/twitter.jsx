import { useState } from "react";
import { Box, Typography, Button, TextField, Paper, Grid } from "@mui/material";
import Navbar from "../app/components/appbar-global";
import { useRouter } from "next/navigation"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Ícono de flecha hacia la izquierda

export default function TwitterPage() {
  const [tweet, setTweet] = useState("");
  const [authUrl, setAuthUrl] = useState("");
  const [pin, setPin] = useState("");
  const [tweetStatus, setTweetStatus] = useState("");
  const [oauthToken, setOauthToken] = useState("");

  const handleTweetChange = (e) => setTweet(e.target.value);
  const handlePinChange = (e) => setPin(e.target.value);

  const router = useRouter();

  const goToInventario = () => {
    router.push("/admin"); // Navigate to inventario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweet) {
      alert("Por favor, ingresa un tweet.");
      return;
    }
    try {
      const res = await fetch("/api/post-tweet");
      const data = await res.json();
      if (data.authorizationUrl) {
        setAuthUrl(data.authorizationUrl);
        setOauthToken(data.oauth_token);
      } else {
        setTweetStatus("Error: No se pudo obtener la URL de autorización");
      }
    } catch (error) {
      console.error("Error al obtener la URL de autorización:", error);
      setTweetStatus("Error en la solicitud: " + error.message);
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pin || !oauthToken) {
      alert("El PIN y el OAuth Token son requeridos");
      return;
    }
    try {
      const response = await fetch("/api/post-tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweet, pin, oauth_token: oauthToken }),
      });
      const result = await response.json();
      if (result.error) {
        setTweetStatus("Error al publicar el tweet: " + result.error);
      } else {
        setTweetStatus("Tweet publicado exitosamente!");
      }
    } catch (error) {
      setTweetStatus("Error en la solicitud: " + error.message);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#3BC9D9",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Prueba Tweets
        </Typography>
        
      </Box>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Escribe tu tweet
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={tweet}
                onChange={handleTweetChange}
                placeholder="Escribe tu tweet aquí..."
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Obtener código de autorización
              </Button>
              {authUrl && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1">
                    Autoriza la aplicación haciendo clic en{" "}
                    <a href={authUrl} target="_blank" rel="noopener noreferrer">
                      este enlace
                    </a>{" "}
                    y pega el código PIN que recibas:
                  </Typography>
                  <TextField
                    fullWidth
                    value={pin}
                    onChange={handlePinChange}
                    placeholder="Código PIN de Twitter"
                    sx={{ marginTop: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handlePinSubmit}
                  >
                    Publicar Tweet
                  </Button>
                </Box>
              )}
              {tweetStatus && (
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    color: tweetStatus.includes("Error") ? "red" : "green",
                  }}
                >
                  {tweetStatus}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Button
        variant="contained"
        color="primary"  // Usa el color primario de tu tema
        onClick={goToInventario}
        style={{
          textTransform: 'none',
          padding: '12px 20px',  // Padding arriba y abajo, más estrecho a los lados
          fontWeight: 'bold',
          backgroundColor: '#004d66', // Puedes cambiar esto si deseas otro color
          display: 'flex',
          justifyContent: 'center',  // Asegura que el texto y el ícono estén alineados correctamente
          alignItems: 'center',  // Centra verticalmente
          borderRadius: '20px',  // Bordes redondeados
          marginBottom: '40px',  // Espaciado hacia abajo
        }}
        startIcon={<ArrowBackIcon />}  // Agrega el ícono de flecha a la izquierda
      >
        Inventario
      </Button>

    </Box>
  );
}
