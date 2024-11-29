const puppeteer = require('puppeteer');

async function scrapeWysa() {
    const browser = await puppeteer.launch({ headless: true }); 
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto('https://www.choosingtherapy.com/wysa-app-review/', {
        waitUntil: 'networkidle2',
    });

    await page.waitForSelector('.rev-info-content');
    const price = await page.$eval('.rev-info-content', (element) => {
        const priceText = element.innerText;
        const match = priceText.match(/\$([0-9,\.]+)/); 
        return match ? match[0] : 'Precio no encontrado';
    });

    console.log('Precio:', price);
    await browser.close();
}

scrapeWysa();

