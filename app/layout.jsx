import localFont from "next/font/local";
import AppBarGlobal from "./components/appbar-global";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/global-themes";
import Footer from "./components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Clarity AI",
  description: "Keep your mind healthy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBarGlobal />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
