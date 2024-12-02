"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Modal,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Icono para eliminar artículos

export default function CatalogoProductos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userType, setUserType] = useState({
    usuario: false,
    doctor: false,
  });
  const [cart, setCart] = useState([]); // Estado del carrito
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para producto seleccionado
  const [isModalOpen, setModalOpen] = useState(false); // Estado del modal
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); // Estado para mostrar alerta de compra

  const productos = [
    {
      name: "Acceso Gratuito",
      type: "usuario",
      details: [
        "Funciones principales del chatbot: Acceso al chatbot para evaluación inicial y sugerencias generales.",
        "Perfiles de psicólogos: Visualización limitada de especialistas (solo los más cercanos o recomendados).",
        "Reseñas y calificaciones: Acceso a opiniones básicas sobre psicólogos.",
        "Protección de datos: Seguridad básica garantizada."],
      available: true,
      img: "./6.jpg",
      buttonColor: "#8FA7A7",
      price: 0,
    },
    {
      name: "Premium",
      type: "usuario",
      details: [
        "Funciones avanzadas del chatbot: Evaluaciones más detalladas y recomendaciones específicas basadas en el perfil.",
        "Búsqueda avanzada de psicólogos: Filtros personalizados (ubicación, costo, enfoque terapéutico, disponibilidad).",
        "Mapa interactivo: Visualización de la ubicación exacta de los especialistas.",
        "Seguimiento del estado emocional: Registro del estado de ánimo y sugerencias personalizadas.",
        "Notificaciones: Recordatorios de citas y ejercicios de autoayuda."
      ],
      available: true,
      img: "./7.jpg",
      buttonColor: "#8F88A9",
      price: 2,
    },
    {
      name: "Team (Paquete para Doctores)",
      type: "doctor",
      details: [
        "Creación de perfil profesional: Espacio para destacar certificaciones, experiencia y enfoque terapéutico.",
        "Validación de credenciales: Garantía de que los usuarios verán al doctor como un especialista certificado.",
        "Alcance ampliado: Acceso a una base de usuarios segmentada para encontrar pacientes ideales.",
        "Gestión de citas: Herramienta integrada para organizar citas y recibir notificaciones.",
        "Estadísticas y métricas: Datos sobre el alcance y rendimiento del perfil profesional.",
        "Publicidad destacada: Opción de aparecer en las búsquedas principales dentro de la app."
      ],
      available: true,
      img: "./8.jpg",
      buttonColor: "#4F695A",
      price: 3,
    },
  ];

  useEffect(() => {
    setFilteredProducts(productos);
  }, []);

  const handleSearch = () => {
    const filtered = productos.filter((product) => {
      const isUserFilter = userType.usuario && product.type === "usuario";
      const isDoctorFilter = userType.doctor && product.type === "doctor";

      if (isUserFilter || isDoctorFilter) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (!userType.usuario && !userType.doctor) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (event) => {
    const { name } = event.target;
    setUserType({
      usuario: name === "usuario" ? !userType.usuario : false,
      doctor: name === "doctor" ? !userType.doctor : false,
    });
  };

  const addToCart = (product) => {
    if (cart.length > 0) {
      alert("Solo puedes agregar un único producto al carrito.");
      return;
    }
    setCart([{ ...product, quantity: 1 }]);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== product.name));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirmPurchase = () => {
    setCart([]);
    setPurchaseSuccess(true);
    setTimeout(() => setPurchaseSuccess(false), 3000); // Mostrar alerta por 3 segundos
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F2F2F0" }}>
      {/* Contenido principal */}
      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 4 }}>
          Nuestros Productos
        </Typography>

        {/* Barra de búsqueda y filtros agrupados */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 4 }}>
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "50%" }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Buscar
          </Button>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={userType.usuario} onChange={handleFilterChange} name="usuario" />}
              label="Usuario"
            />
            <FormControlLabel
              control={<Checkbox checked={userType.doctor} onChange={handleFilterChange} name="doctor" />}
              label="Doctor"
            />
          </FormGroup>
        </Box>

        {/* Productos */}
        <Grid container spacing={4}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Box component="img" src={product.img} alt={product.name} sx={{ width: "100%", height: 200 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  Precio: ${product.price}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenModal(product)}
                  sx={{ marginBottom: 2 }}
                >
                  Ver detalles
                </Button>
                <Button variant="contained" onClick={() => addToCart(product)}>
                  Añadir al carrito
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Carrito en el lateral */}
      <Box
        sx={{
          width: 300,
          padding: 4,
          backgroundColor: "#D9D9D9",
          boxShadow: "-2px 0px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Carrito
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <List>
          {cart.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" onClick={() => removeFromCart(item)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${item.name} x${item.quantity}`}
                secondary={`$${item.price * item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total: ${getTotalPrice()}
        </Typography>
        {/* Botón para confirmar la compra */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmPurchase}
          sx={{ marginTop: 2, width: "100%" }}
          disabled={cart.length === 0} // Deshabilitar si el carrito está vacío
        >
          Confirmar compra
        </Button>
      </Box>

      {/* Modal de detalles */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedProduct && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedProduct.name}
              </Typography>
              <List>
                {selectedProduct.details.map((detail, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${detail}`} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                sx={{ marginTop: 2 }}
              >
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Alerta de compra exitosa */}
      {purchaseSuccess && (
        <Alert severity="success" sx={{ position: "fixed", top: 20, right: 20 }}>
          Compra realizada con éxito
        </Alert>
      )}
    </Box>
  );
}