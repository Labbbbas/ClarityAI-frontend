"use client";

import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Container } from "@mui/material";

export default function AboutPage() {
  const teamMembers = [
    { name: "Arreola Robles Itzel", role: "CEO", avatar: "./13.jpg" },
    { name: "Beristain Martínez Rodrigo", role: "CTO", avatar: "./12.jpg" },
    { name: "Fajardo Suárez Jesús Miguel", role: "COO", avatar: "./12.jpg" },
    { name: "Labastida Vázquez Fernando", role: "Ingeniero de Software", avatar: "./12.jpg" },
    { name: "Núñez Luna Aranza Abril", role: "Diseñadora UX/UI", avatar: "./13.jpg" },
    { name: "Segura Garduño Karen Alin", role: "Especialista en IA", avatar: "./13.jpg" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Título principal */}
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
        Acerca de Nosotros
      </Typography>

      {/* Sección: Acerca de ClarityAI */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Acerca de ClarityAI
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
            El presente proyecto tiene el propósito de crear una aplicación web de tipo E-commerce orientada a la promoción y comercialización de la herramienta de inteligencia artificial ClarityAI. Esta herramienta está diseñada para brindar asesoría psicológica especializada y personalizada conforme a las necesidades de los usuarios y su perfil.
            La aplicación está dirigida principalmente a público jóven que busca orientación psicológica accesible, dinámica y confiable. Sin embargo, ClarityAI busca ser inclusiva, asegurando que cualquier persona, independientemente de su edad o experiencia tecnológica, pueda beneficiarse de sus funcionalidades.
        </Typography>
      </Box>

      {/* Sección: Objetivos */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Objetivos
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
        Este proyecto tiene como objetivo promover la herramienta ClarityAI a través de una plataforma de comercio electrónico que encapsule los conocimientos adquiridos a lo largo del curso de Negocios Electrónicos y Desarrollo Web. Esta plataforma pretende lo siguiente:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">Ofrecer acceso a servicios psicológicos de calidad para todos.</Typography>
          </li>
          <li>
            <Typography variant="body1">
              Utilizar inteligencia artificial para personalizar recomendaciones y facilitar evaluaciones iniciales.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Promover el bienestar emocional mediante herramientas accesibles y fáciles de usar.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
                Fomentar el aprendizaje práctico.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
                Impulsar la accesibilidad tecnológica.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
                Establecer confianza en el producto.
            </Typography>
          </li>
        </ul>
      </Box>

      {/* Sección: Equipo */}
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          Equipo
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}