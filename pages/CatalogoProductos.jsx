import { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";

export default function CatalogoProductos() {
  // Estado para el término de búsqueda, productos filtrados y tipo de usuario (filtros)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userType, setUserType] = useState({
    usuario: false,
    doctor: false,
  });

  // Datos de los productos del catálogo
  const productos = [
    {
      name: "Acceso Gratuito",
      type: "usuario",
      details: [
        "Funciones principales del chatbot: Acceso al chatbot para evaluación inicial y sugerencias generales.",
        "Perfiles de psicólogos: Visualización limitada de especialistas (solo los más cercanos o recomendados).",
        "Reseñas y calificaciones: Acceso a opiniones básicas sobre psicólogos.",
        "Protección de datos: Seguridad básica garantizada.",
      ],
      available: true,
      img: "./6.jpg",
      buttonColor: "#8FA7A7",
      price: "$1",
    },
    {
      name: "Premium",
      type: "usuario",
      details: [
        "Funciones avanzadas del chatbot: Evaluaciones más detalladas y recomendaciones específicas basadas en el perfil.",
        "Búsqueda avanzada de psicólogos: Filtros personalizados (ubicación, costo, enfoque terapéutico, disponibilidad).",
        "Mapa interactivo: Visualización de la ubicación exacta de los especialistas.",
        "Seguimiento del estado emocional: Registro del estado de ánimo y sugerencias personalizadas.",
        "Notificaciones: Recordatorios de citas y ejercicios de autoayuda.",
      ],
      available: true,
      img: "./7.jpg",
      buttonColor: "#8F88A9",
      price: "$2",
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
        "Publicidad destacada: Opción de aparecer en las búsquedas principales dentro de la app.",
      ],
      available: true,
      img: "./8.jpg",
      buttonColor: "#4F695A",
      price: "$3",
    },
  ];

  // useEffect para inicializar la lista de productos mostrados
  useEffect(() => {
    // Mostrar todos los productos al cargar la página
    setFilteredProducts(productos);
  }, []);

  // Manejo de búsqueda, filtra productos según término y filtros seleccionados
  const handleSearch = () => {
    const filtered = productos.filter((product) => {
      const isUserFilter = userType.usuario && product.type === "usuario";
      const isDoctorFilter = userType.doctor && product.type === "doctor";

      if (isUserFilter || isDoctorFilter) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (!userType.usuario && !userType.doctor) {
        // Si no hay filtros activos, busca por nombre
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    // Manejo de casos personalizados si no hay coincidencias válidas
    if (userType.usuario && searchTerm.toLowerCase() === "team") {
      setFilteredProducts([
        {
          name: "Error",
          message: "No hay un paquete así para usuarios.",
        },
      ]);
    } else if (userType.doctor && searchTerm.toLowerCase() === "acceso gratuito") {
      setFilteredProducts([
        {
          name: "Error",
          message: "No hay un paquete así para doctores. Solo se maneja el paquete Team.",
        },
      ]);
    } else if (userType.doctor && searchTerm.toLowerCase() === "premium") {
      setFilteredProducts([
        {
          name: "Error",
          message: "No hay un paquete Premium para doctores. Solo se maneja el paquete Team.",
        },
      ]);
    } else {
      setFilteredProducts(filtered);
    }
  };

  // Actualización de los filtros (solo permite uno activo a la vez)
  const handleFilterChange = (event) => {
    const { name } = event.target;

    // Activa un filtro y desactiva el otro
    setUserType({
      usuario: name === "usuario" ? !userType.usuario : false,
      doctor: name === "doctor" ? !userType.doctor : false,
    });
  };

  // Redirección al realizar una compra
  const handleBuyClick = () => {
    // Redirige a la página de login
    window.location.href = "/login";
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F2F2F0", minHeight: "100vh" }}>
      {/* Encabezado */}
      <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 4 }}>
        Nuestros Productos
      </Typography>

      {/* Barra de búsqueda */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "50%" }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#598586",
            "&:hover": {
              backgroundColor: "#466A6B",
            },
          }}
        >
          Buscar
        </Button>
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Filtros
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={userType.usuario}
                onChange={handleFilterChange}
                name="usuario"
              />
            }
            label="Usuario"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={userType.doctor}
                onChange={handleFilterChange}
                name="doctor"
              />
            }
            label="Doctor"
          />
        </FormGroup>
      </Box>

      {/* Resultados del catálogo */}
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts[0].name === "Error" ? (
            // Mostrar error si no hay coincidencias
            <Alert severity="error" sx={{ width: "100%" }}>
              {filteredProducts[0].message}
            </Alert>
          ) : (
            // Muestra los productos disponibles
            filteredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 2,
                  }}
                >
                  {/* Imagen del producto */}
                  <Box
                    component="img"
                    src={product.img}
                    alt={`Producto ${product.name}`}
                    sx={{
                      width: "100%",
                      height: 250,
                      objectFit: "contain",
                      borderRadius: 2,
                      marginBottom: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {product.name}
                  </Typography>
                  {/* Lista de detalles */}
                  <List>
                    {product.details.map((detail, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText
                          primary={`• ${detail}`}
                          sx={{ textAlign: "justify" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    {/* Disponibilidad y precio */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: product.available ? "green" : "red",
                        fontWeight: "bold",
                        marginBottom: 1,
                      }}
                    >
                      {product.available ? "Disponible" : "Agotado"}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        color: "#36453B",
                        marginBottom: 2,
                      }}
                    >
                      {product.price}
                    </Typography>
                    {/* Botón de compra */}
                    <Button
                      variant="contained"
                      disabled={!product.available}
                      onClick={handleBuyClick}
                      sx={{
                        backgroundColor: product.buttonColor,
                        "&:hover": {
                          backgroundColor: product.buttonColor,
                        },
                      }}
                    >
                      Comprar
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          )
        ) : (
          // Si no se encontraron resultados
          <Alert severity="info" sx={{ width: "100%" }}>
            No se encontraron productos.
          </Alert>
        )}
      </Grid>
    </Box>
  );
}
