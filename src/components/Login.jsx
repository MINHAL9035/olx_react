import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        toast.success('success')
        navigate("/")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
      })


  }





  return (
    <div className='bg-gray-100 h-screen grid grid-cols-12 pb-5' >

      <span className='col-span-4'></span>
      <div className='col-span-4 m-10 bg-white my-auto rounded-xl h-3/4' >

        <Link to={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-7 w-7 h-7 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </Link>
        <div className='mx-auto text-center' >
          <img className='p-2 w-24 mx-auto' src="/olx-logo.png" alt="" />

          <h1 className='font-bold text-xl mt-6'>Enter Email and Password </h1>

          <input onChange={(e) => setEmail(e.target.value)} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-10 border-black' type="text" placeholder='Email' />
          <input onChange={(e) => setPassword(e.target.value)} className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black' type="password" placeholder='Password' />

          <button onClick={(e) => handleLogin(e)} className='w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-10'>Login</button>

          <Link to={'/signup'}>
            <p className=' my-14'>Create an account</p>
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Login