import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <input
        type="email"
        placeholder="Email"
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
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="cliente">Cliente</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Registrarse</button>
      <p>{message}</p>
    </form>
  );
}