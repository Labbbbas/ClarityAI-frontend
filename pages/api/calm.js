const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeCalm() {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        };
        const { data } = await axios.get('https://www.calm.com/es', { headers });
        const $ = cheerio.load(data);
        const price = $('.sc-463340cb-3.htktFv .sc-bcXHqe.jWxXar').text().trim();

        console.log('Precio:', price);
    } catch (error) {
        console.error('Error', error.message);
    }
}

scrapeCalm();

