"use client"
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostName = parsedURL.hostname;

    //check if it contains amazon.com
    if(hostName.includes('amazon.com.ph') ||
       hostName.includes('amazon.')|| 
       hostName.endsWith('amazon')
      ){
        return true;
      }
    
  } catch (error) {
    return false;
  }
  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if(!isValidLink) return alert('Please provide a valid amazon link')
      try {
        setIsLoading(true);

        //Scrape 
        const product = await scrapeAndStoreProduct(searchPrompt);
      } catch (error) {
        console.log(error);
      } finally{
       setIsLoading(false)
      }
  }
  return (
    <form 
        className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
    >
        <input
            type='text'
            value={searchPrompt}
            onChange={(e)=> setSearchPrompt(e.target.value)}
            placeholder='Enter product link'
            className='searchbar-input'
        />

        <button 
          type='submit' 
          className='searchbar-btn'
          disabled={searchPrompt === ''}
          >
            {isLoading ? 'Searching...' : 'Search'}
        </button>

    </form>
  )
}

export default Searchbar