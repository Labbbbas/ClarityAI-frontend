"use client";

// Import necessary components from Material UI and other libraries
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { theme } from "../styles/global-themes";

export default function AppBarGlobal() {
    const router = useRouter();
    const [value, setValue] = useState(false);  // State for tab selection (default: false)
    const [isAuthenticated, setIsAuthenticated] = useState(null);  // State for authentication status (null initially)

    // Function to update authentication status based on localStorage value
    const updateAuthStatus = () => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true"; // Check if user is authenticated in localStorage
        setIsAuthenticated(authStatus); // Set authentication status
    };

    useEffect(() => {
        // ** Initialize authentication status from localStorage **
        updateAuthStatus();

        // ** Check authentication status every second **
        const intervalId = setInterval(updateAuthStatus, 1000); // Update authentication status at intervals

        // Cleanup: clear interval when the component is unmounted
        return () => {
            clearInterval(intervalId); // Clears the interval to avoid memory leaks
        };
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Handle tab change and update the selected value
    const handleChange = (newValue) => {
        setValue(newValue); // Update the selected tab
    };

    // Navigation functions for each tab
    const goToHome = () => {
        setValue(false); // Reset tab value for home
        router.push("/"); // Navigate to home page
    };

    const goToAbout = () => {
        setValue(0); // Set tab value for About
        router.push("/about"); // Navigate to About page
    };

    const goToContact = () => {
        setValue(1); // Set tab value for Contact
        router.push("/contact"); // Navigate to Contact page
    };

    const goToCatalogo = () => {
      setValue(2); // Set tab value for About
      router.push("/catalogo"); // Navigate to About page
    };
    // const goToMyApps = () => {
    //     setValue(2); // Set tab value for My Apps
    //     router.push("/myApps"); // Navigate to My Apps page
    // };

    // Handle sign out process
    const handleSignOut = () => {
        setIsAuthenticated(false); // Update authentication status
        localStorage.setItem("isAuthenticated", "false"); // Update localStorage
        setValue(false); // Reset tab value
        router.push("/"); // Redirect to home page
    };

    return (
        <AppBar
            position="static"
            sx={{
                color: "secondary", // Set text color for the AppBar
                minHeight: "64px", // Set minimum height for the AppBar
            }}
        >
            <Toolbar sx={{ minHeight: "64px" }}>
                <Box
                    sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={goToHome} // Navigate to home page when clicked
                >

                    <Typography
                        variant="h5"
                        sx={{
                            ml: 2, // Margin left
                            mr: 3, // Margin right
                            display: { xs: "none", md: "block" }, // Hide on small screens, show on medium and large
                            whiteSpace: "nowrap", // Prevent text from wrapping
                        }}
                    >
                        Clarity AI
                    </Typography>
                </Box>

                {/* Tabs for navigation */}
                <Tabs
                    value={value} // Controlled value for the selected tab
                    onChange={(_, newValue) => handleChange(newValue)} // Update tab selection
                    textColor="inherit" // Inherit text color
                    sx={{
                        flexGrow: 1, // Allow Tabs to take up remaining space
                        "& .MuiTabs-indicator": {
                            backgroundColor: value === false ? "transparent" : theme.palette.secondary.main, // Tab indicator color
                        },
                    }}
                >
                    {/* About Tab */}
                    <Tab label="Acerca De" onClick={goToAbout} sx={{ color: value === 0 ? theme.palette.text.light : '#ffffff' }} />
                    {/* Contact Tab */}
                    <Tab label="Contacto" onClick={goToContact} sx={{ color: value === 1 ? theme.palette.text.light : '#ffffff' }} />
                    {/* Catalogo Tap - Display only if authenticated */}
                    <Tab label="Catalogo" onClick={goToCatalogo} sx={{ color: value === 1 ? theme.palette.text.light : '#ffffff' }} />
                    {/* My Apps Tab - Display only if authenticated */}
                    {/* {isAuthenticated && (
                        <Tab label="My Apps" onClick={goToMyApps} sx={{ color: value === 2 ? theme.palette.text.light : '#ffffff' }} />
                    )} */}
                </Tabs>

                {/* Dynamic buttons based on authentication status */}
                {isAuthenticated === null ? null : isAuthenticated ? (
                    // Show Sign Out button if authenticated
                    <Button color="secondary" onClick={handleSignOut} variant="contained">Salir</Button>
                ) : (
                    // Show Sign In and Sign Up buttons if not authenticated
                    <>
                        <Button href="/signIn" color="secondary" sx={{ mr: 1, whiteSpace: "nowrap" }} variant="outlined">Iniciar Sesión</Button>
                        <Button href="/signUp" color="secondary" sx={{ whiteSpace: "nowrap" }} variant="contained">Registrarse</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
