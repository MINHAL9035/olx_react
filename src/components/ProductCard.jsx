import React, { useContext } from 'react'
import { PostContext } from '../store/context'
import { FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
  console.log("my props", props);

  const { name, price, location, imageUrl, fullproduct } = props


  const { SetPost } = useContext(PostContext)

  const handleClick = () => {
    SetPost(fullproduct)
  }

  return (
    <div className='border border-gray-300 shadow-sm container mx-auto rounded-md'>

      <Link to={'/productDetails'}>
        <div onClick={handleClick} className='m-2 '>
          <div className='relative'>
            <img className='h-60 object-cover mx-auto' src={imageUrl} alt="" />
            <div className='rounded-full bg-white absolute right-2 top-2 h-10 w-10 '>
              <FaRegHeart className='mt-[11px] ml-[11px]' size={20} />
            </div>
          </div>
          <div className='my-3 mx-2 flex flex-col items-center'>
            <h1 className='font-bold text-2xl'>₹ {price}</h1>
            <p className='text-gray-500 font-mono mb-1'>{name} sale</p>
            <p className='text-xs font-mono text-gray-500'>{location.toUpperCase()}</p>
          </div>

        </div>
      </Link>

    </div>
  )
}

export default ProductCard