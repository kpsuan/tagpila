import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from "../utils";

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
        
        const wholePart = $('.a-price-whole').first().text().trim();
        const fractionPart = $('.a-price-fraction').first().text().trim();
        const price = `${wholePart}.${fractionPart}`;

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.small.a-color-secondary'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price'),
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
          );

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') || 
        $('#landingImage').attr('data-a-dynamic-image') ||
        '{}'
        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

        const description = extractDescription($)

        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount:100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
          }
      

        console.log(data);

    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}