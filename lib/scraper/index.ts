import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice } from "../utils";

export async function scrapedAmazonProduct(url:string) {
    if(!url)return;

    //brightdata config
    //curl -i --proxy brd.superproxy.io:33335 --proxy-user brd-customer-hl_3a59e609-zone-tagpila:iv66u07opv56 -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"
    const username = String (process.env.BRIGHT_DATA_USERNAME);
    const password = String (process.env.BRIGHT_DATA_PASSWORD);
    const port = 33335;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },

        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        //fetch product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
       
        //extract title
        const title = $('#productTitle').text().trim();
        
        const currency = $('.a-price-symbol').first().text().trim();
        const wholePart = $('.a-price-whole').first().text().trim();
        const fractionPart = $('.a-price-fraction').first().text().trim();
        const price = `${wholePart}.${fractionPart}`;

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.small.a-color-secondary'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price'),
        );
        console.log(title, price);

    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}