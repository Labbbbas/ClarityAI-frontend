import { useState } from "react";
import { useRouter } from "next/router"; // Para manejar las redirecciones.

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter(); // Instancia de router.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      // Redirige según el rol.
      if (data.role === "admin") {
        router.push("/admin"); // Página de administrador.
      } else if (data.role === "cliente") {
        router.push("/cliente"); // Página de cliente.
      }
    } else {
      setMessage(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Iniciar Sesión</button>
      <p>{message}</p>
    </form>
  );
}