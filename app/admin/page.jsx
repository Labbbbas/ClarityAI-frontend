"use client";

import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';  // Ícono de flecha
import { useRouter } from "next/navigation"; 

export default function Home() {
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.1},
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "product_name", headerName: "Plan", flex: 0.4 },
  ];

  const columns_plans = [
    { field: "_id", headerName: "Plan", flex: 0.5 },
    { field: "totaldocs", headerName: "Personas con ese plan", flex: 0.5 },
  ]

  const router = useRouter();

  const [rowsUsers, setRowsUsers] = useState();
  const [rowsPlans, setRowsPlans] = useState();

  useEffect(() => {
    fetchUsers();
    fetchPlans();
  }, [] );

  const fetchUsers = async() => {
    try{
      const response = await axios.get("http://127.0.0.1:8000/api/v1/users");
      setRowsUsers(response.data);

    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  const fetchPlans = async() => {
    try{
      const response = await axios.get("http://127.0.0.1:8000/api/v1/users/plan");
      console.log("aaa", response.data)
      setRowsPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans", error);
    }
  }

  const goToTwitter = () => {
    router.push("/twitter"); // Navigate to twitter page
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        >
        <Typography 
            variant="h3" 
            style={{ 
                color: '#004d66', // Cambia el color que desees
                fontWeight: 'bold', // Opcional, para hacerlo más destacado
                paddingTop: 10
            }}
        >
            Inventario
        </Typography>
        </Box>


      <Paper
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "0 auto",
          height: "400px",
        }}
      >
        <DataGrid
          columns={columns}
          rows={rowsUsers}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: "1px solid #DDD", // Borde de la tabla
            backgroundColor: "#F9F9F9", // Color de la tabla (gris)
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold", // Pone en negritas los headers
            },
            "& .MuiDataGrid-columnHeaders": {
              // División entre los headers y las filas
              borderBottom: "2px solid #DDD",
            },
            "& .MuiDataGrid-row:hover": {
              // Para cuando pasas el mouse por encima
              backgroundColor: "#F5F5F5", // gris
            },
            "& .MuiDataGrid-cell": {
              // Lineas que separan las columnas
              borderRight: "1px solid #DDD",
            },
            "& .MuiDataGrid-footerContainer": {
              // Color de la parte de abajo
              backgroundColor: "#F1F1F1", // gris
            },
          }}
        />
      </Paper>


      <Paper
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: "80%",
          margin: "0 auto",
          height: "400px",
        }}
      >
        <DataGrid
          columns={columns_plans}
          rows={rowsPlans}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: "1px solid #DDD", // Borde de la tabla
            backgroundColor: "#F9F9F9", // Color de la tabla (gris)
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold", // Pone en negritas los headers
            },
            "& .MuiDataGrid-columnHeaders": {
              // División entre los headers y las filas
              borderBottom: "2px solid #DDD",
            },
            "& .MuiDataGrid-row:hover": {
              // Para cuando pasas el mouse por encima
              backgroundColor: "#F5F5F5", // gris
            },
            "& .MuiDataGrid-cell": {
              // Lineas que separan las columnas
              borderRight: "1px solid #DDD",
            },
            "& .MuiDataGrid-footerContainer": {
              // Color de la parte de abajo
              backgroundColor: "#F1F1F1", // gris
            },
          }}
        />
      </Paper>


      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <Button
          variant="contained"
          color="primary" // Usa el color primario del tema
          onClick={goToTwitter}
          style={{
            textTransform: 'none',
            padding: '12px 20px',  // Padding arriba y abajo, más estrecho a los lados
            fontWeight: 'bold',
            backgroundColor: '#1DA1F2', // Color de fondo de Twitter
            display: 'flex',
            justifyContent: 'center',  // Asegura que el texto y el ícono estén alineados correctamente
            alignItems: 'center',  // Centra verticalmente
            borderRadius: '20px',  // Bordes redondeados
          }}
          endIcon={<ArrowForwardIcon />}  // Agrega el ícono de flecha a la derecha
          sx={{ textAlign: 'right', marginTop: 1, mb: 1 }} // Alinea el botón a la derecha
      >
        Twitter
      </Button>
      </div>

    </Container>
  );
}
