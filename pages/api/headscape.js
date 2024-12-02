const puppeteer = require('puppeteer');

async function scrapeHeadspace() {
    const browser = await puppeteer.launch({ headless: false });  
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
}

scrapeHeadspace();

