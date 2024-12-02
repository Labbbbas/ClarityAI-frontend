// Importamos las librerías necesarias
const axios = require('axios'); // Axios se utiliza para realizar solicitudes HTTP
const cheerio = require('cheerio'); // Cheerio se utiliza para analizar el contenido HTML y extraer datos

// Creamos el handler para el endpoint API de Next.js
export default async function handler(req, res) {
    try {
        // Configurar cabeceras para la solicitud HTTP, simulando un navegador real
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        };

        // Realizar la solicitud GET a la página de Calm con las cabeceras configuradas
        const { data } = await axios.get('https://www.calm.com/es', { headers });

        // Cargar el HTML de la respuesta con Cheerio para analizarlo
        const $ = cheerio.load(data);

        // Buscar el elemento HTML que contiene el precio usando selectores de Cheerio
        // Es importante que estos selectores sean específicos y estén actualizados
        const price = $('.sc-463340cb-3.htktFv .sc-bcXHqe.jWxXar').text().trim();

        // Verificar si se encontró un precio y devolverlo en la respuesta
        if (price) {
            res.status(200).json({ price }); // Respuesta exitosa con el precio encontrado
        } else {
            res.status(404).json({ error: 'No se pudo encontrar el precio en la página' }); // Respuesta si no se encuentra el precio
        }
    } catch (error) {
        // Manejar errores durante el proceso de scraping o la solicitud HTTP
        console.error('Error al hacer scraping:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' }); // Respuesta en caso de error del servidor
    }
}