
import { useState } from "react";
import { Box, TextField, Button, Select, MenuItem, Typography } from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "cliente" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#B5EAB8" }} // Fondo del contenedor
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
          Registro
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
          sx={{ marginBottom: 2 }}
        />
        <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
          <Typography
            variant="body1"
            sx={{
              marginRight: 2,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Rol:
          </Typography>
          <Select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            fullWidth
          >
            <MenuItem value="cliente">Cliente</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </Select>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#3F8C4B",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Regístrate
        </Button>
        {message && (
          <Typography variant="body2" sx={{ color: "red", marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
