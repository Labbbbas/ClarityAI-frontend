import { openDb } from "../../db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, role } = req.body;
    const db = await openDb();

    try {
      await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [
        email,
        password,
        role,
      ]);
      res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
      res.status(400).json({ message: "Error al registrar usuario", error });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}