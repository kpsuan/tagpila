import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <>
    <div className="containers">
    <section className="p-5 py-24">      
      <div className="flex max-xl  gap-16">
        <div className="flex flex-col justify-center">
            <p className='small-text'>
              Smart shopping starts here: 
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              always low prices sa
              <span className="text-purple-700"> Tagpila! </span>
            </h1>

            <p className="paragraph-text2">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <Searchbar/>
        </div>

        <HeroCarousel/>
      </div>
    </section>

    <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          
        </div>
      </section>
      </div>
    </>
  )
}

export default Home