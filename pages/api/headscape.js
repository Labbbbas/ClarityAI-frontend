const puppeteer = require('puppeteer');

async function scrapeHeadspace() {
    const browser = await puppeteer.launch({ headless: true });  
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto('https://checkout.headspace.com/es/checkout?voucherCode=BF2024A', {
        waitUntil: 'networkidle2',
    });
    await page.waitForSelector('.css-k4jtko');

    const content = await page.$eval('.css-k4jtko', (element) => element.innerHTML);
    const originalPrice = await page.$eval(
        '.css-k4jtko span[style="color: rgb(255, 255, 255); text-decoration: line-through;"]',
        (element) => element.textContent.trim()
    );
    console.log('Precio:', originalPrice);
    await browser.close();
    return originalPrice;
}

export default async function handler(req, res) {
    try {
        const price = await scrapeHeadspace();
        res.status(200).json({ price });
    } catch (error) {
        console.error('Error al obtener el precio:', error);
        res.status(500).json({ error: 'Error al obtener el precio' });
    }
}
