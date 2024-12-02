const axios = require('axios');
const cheerio = require('cheerio');
const translate = require('google-translate-api-x');

async function scrapeWoebot() {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        };
        const { data } = await axios.get('https://woebothealth.com/thank-you-for-your-interest-in-woebot/', { headers });
        const $ = cheerio.load(data);
        const paragraph = $('.has-medium-font-size')
            .filter((i, el) => $(el).text().includes('Woebot is only offered')) 
            .text()
            .trim();
        const message = paragraph.substring(paragraph.indexOf('Woebot is only offered'));
        const translated = await translate(message, { to: 'es' });
        console.log('Mensaje;', translated.text);
    } catch (error) {
        console.error('Error al obtener o traducir el mensaje:', error.message);
    }
}

scrapeWoebot();

