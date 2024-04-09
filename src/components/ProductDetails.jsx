import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../store/context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Shimmer from './Shimmer'
import { db } from '../firebase/config'
import { auth } from '../firebase/config'


const ProductDetails = () => {

  const { post } = useContext(PostContext)
  const [user, setUser] = useState('')

  const getUsers = async () => {
    const q = query(collection(db, 'Users'), where('uid', '==', post.userId))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    })
  }

  useEffect(() => {
    getUsers()
  }, [])
  console.log("User:", user);


  const getUserEmail = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return currentUser.email;
    } else {
      return "Email not available";
    }
  }

  return post == null || user == null ? (<Shimmer />) : (
    <div className='container bg-white mx-auto mt-16 mb-10'>
  <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
    <div className='relative w-120 bg-white'>
      <div className='w-120 h-96  bg-white overflow-hidden'>
        <img className='object-cover object-center w-120 h-full bg-white' src={post.imageUrl} alt="Product" />
      </div>
      <div className="absolute inset-0"></div>
    </div>
    <div className='p-6 font-mono'>
      <h2 className='text-lg font-serif font-semibold text-black-600 mb-2'>Category: {post.category}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <p className='text-gray-700 mb-1'><strong>Product Name:</strong> {post.name}</p>
          <p className='text-gray-700 mb-1'><strong>Location:</strong> {post.location}</p>
          <p className='text-gray-700'><strong>Posted on:</strong> {post.createdAt}</p>
        </div>
        <div className="mb-2">
          <p className='text-gray-700 mb-1'><strong>Seller:</strong> {user.userName}</p>
          <p className='text-gray-700 mb-1'><strong>Phone:</strong> {user.phone}</p>
          <p className='text-gray-700 mb-1'><strong>Seller Email:</strong> {getUserEmail()}</p>
          <p className='text-xl font-bold mt-2'>₹{post.price}</p>
        </div>
      </div>
      <div className='mt-6 flex justify-between items-center'>
        <div className='text-xl font-bold'></div>
        <button className='bg-green-500 hover:bg-green-600 text-white  font-semibold py-2 px-6 mr-80 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>Buy Product</button>
      </div>
    </div>
  </div>
</div>



  )
}

export default ProductDetails