export const users = [
  { id: 1, email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, email: "client@example.com", password: "client123", role: "client" },
];

export function addUser(email, password, role) {
  const id = users.length + 1;
  users.push({ id, email, password, role });
}
