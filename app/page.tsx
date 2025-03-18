import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home = async () => {
  const allProducts = await getAllProducts()
  return (
    <>
    <section className="p-5 py-24">   
    <div className="containers">
      <div className="flex max-xl  gap-16">
        <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center mb-3 text-amber-600 font-medium">
                <p className="text-sm md:text-base flex items-center">
                  Smart shopping starts here
                  <span className="ml-2">
                    <Image 
                      src="/assets/icons/arrow-right.svg"
                      alt="arrow-right"
                      width={16}
                      height={16}
                      className="inline"
                    />
                  </span>
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Always low prices sa
                <span className="text-purple-700"> Tagpila! </span>
              </h1>

              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                Discover the best deals on everything you need, with real-time price tracking and alerts to help you save more on every purchase.
              </p>

            <Searchbar/>

            
        </div>

        <HeroCarousel/>
      </div>
    </div>

    </section>

    <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product = {product}/>
          ))}
          
        </div>
      </section>
    </>
  )
}

export default Home