import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import ProductCard from './ProductCard'

const Home = () => {


  const [products, setProducts] = useState([])
  const productCollectionRef = collection(db, 'Products')


  const getProducts = async () => {
    const data = await getDocs(productCollectionRef)
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getProducts()

  }, [])

  return (
    <>
      <div className='bg-gray-50 shadow-md py-2'>
        <div className='container mx-auto'>
          <div className='flex items-end font-serif justify-around text-[#002f34]'>
            <div className='font-semibold'>ALL CATEGORIES</div>
            <div className='text-sm'>Cars</div>
            <div className='text-sm'>Motorcycles</div>
            <div className='text-sm'>Mobile Phones</div>
            <div className='text-sm'>For Sale: Houses & Apartments</div>
            <div className='text-sm'>Scooters</div>
            <div className='text-sm'>Commercial & Other Vehicles</div>
            <div className='text-sm'>For Rent: Houses & Apartments</div>
          </div>
        </div>
      </div>
      <div className=' container mx-auto mb-14'>
        <h1 className='text-2xl font-serif underline ml-5 my-6'>Fresh Recommendations</h1>

        <div className='grid grid-cols-4 gap-4 ml-5 mr-3'>
          {
            products.map((product) => 
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                fullproduct={product} // Corrected prop name to fullproduct
                location={product.location}
              />

            )
          }

        </div> 

      </div>
    </>
  )
}

export default Home