import { useState } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, Typography } from "@mui/material"; // Importamos los componentes de Material-UI.

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "cliente") {
        router.push("/cliente");
      }
    } else {
      setMessage(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#9CD0D6" }} // Color de fondo.
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2, color: "#333" }}>
          Iniciar Sesión
        </Typography>
        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          sx={{ marginBottom: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "##3BC9D9",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Iniciar Sesión
        </Button>
        {message && (
          <Typography
            variant="body2"
            sx={{ color: "red", marginTop: 2 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
