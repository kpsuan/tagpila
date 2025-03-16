export function extractPrice(...elements: any){
    for (const element of elements){
        const priceText = element.text().trim();

        if(priceText)  parseFloat(priceText.replace(/[^0-9.]/g, '')); // Extract numerical value
    }

    return '';
}