"use client";
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

const contacto = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "0",
    backgroundColor: "#b3e5e5", // Fondo azul claro
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const contactContainerStyle = {
    textAlign: "center",
    backgroundColor: "#dff3f3",
    padding: "20px 40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "1.8em",
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "15px",
    marginBottom: "15px",
  };

  const iconStyle = {
    width: "30px",
    height: "30px",
  };

  const extraImageStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "5px", // Puedes quitarlo si no quieres esquinas redondeadas
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={containerStyle}>
      <div style={contactContainerStyle}>
        <h1 style={titleStyle}>Contacto y Soporte</h1>
        
        <div style={contactItemStyle}>
          <img
            src="./10.jpeg" // 
            alt="Imagen"
            style={extraImageStyle}
          />
          <p>clarity AI | @clarity71145</p>
        </div>

        <div style={contactItemStyle}>
          <img
            src="./9.jpeg" // 
            alt="Imagen"
            style={extraImageStyle}
          />
          <p>clarityain@gmail.com</p>
        </div>

        <div style={contactItemStyle}>
          <img
            src="./11.jpeg" // 
            alt="Imagen"
            style={extraImageStyle}
          />
          <p>Escolar 04360, C.U., Coyoacán, 04510 Ciudad de México, CDMX</p>
        </div>
      </div>
    </div>
  );
};

export default contacto;