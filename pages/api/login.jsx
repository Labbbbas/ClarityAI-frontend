import { openDb } from "../../db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const db = await openDb();

    const user = await db.get("SELECT * FROM users WHERE email = ? AND password = ?", [
      email,
      password,
    ]);

    if (user) {
      res.status(200).json({ role: user.role, message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}