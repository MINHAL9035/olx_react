import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../store/context'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

const SignUp = () => {

  const { app } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('iamcontext', app)
    console.log('userName:', userName);
    console.log('email:', email);
    console.log('password:', password);
    console.log('phone:', phone);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: userName
      });

      const userCollectionRef = collection(db, 'Users')
      await addDoc(userCollectionRef, { userName: userName, uid: user.uid, phone: phone })
      console.log('created user', user);
      navigate('/login')
    } catch (error) {
      console.log(error);

    }
  }



  return (
    <div className='bg-gray-100 min-h-screen pb-5 sm:grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 ' >
      <span className='col-span-1 sm:col-span-4'></span>
      <div className='col-span-10 sm:col-span-4 md:col-span-4 lg:col-span-4 m-5 sm:m-10 bg-white sm:h-3/4 my-auto rounded-xl ' >
        <Link to={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 w-7 h-7 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </Link>
        <div className='mx-auto text-center' >
          <img className='p-2 w-24 mx-auto mt-5 ' src="/olx-logo.png" alt="" />
          <h1 className='font-bold text-xl mt-2'>Create your Account </h1>

          <input onChange={(e) => setUserName(e.target.value)} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="text" placeholder='Username' />
          <input onChange={(e) => setPhone(e.target.value)} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="text" placeholder='Phone Number' />
          <input onChange={(e) => setEmail(e.target.value)} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="text" placeholder='Email' />
          <input onChange={(e) => setPassword(e.target.value)} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="password" placeholder='Password' />
          <button onClick={(e) => { handleCreate(e) }} className='w-3/4   bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-2'>Create</button>

          <Link to={'/login'}><p className=' my-4'>Login with Account</p></Link>
        </div>
      </div>
      <span className='col-span-1 sm:col-span-4'></span>
    </div>


  )
}

export default SignUp