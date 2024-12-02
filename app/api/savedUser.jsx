import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const filePath = path.join(process.cwd(), 'data', 'users.json'); // Define route
        
        let data = []; // Read file and add data
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        data.push({ email, password }); // Add new user

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Update data

        res.status(200).json({ message: 'Usuario guardado exitosamente' });
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
