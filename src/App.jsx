import React, { createContext, useEffect, useState } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Body from "./components/Body"
import Home from "./components/Home"
import SignUp from "./components/SignUp"
import { FirebaseContext, PostContext } from "./store/context"
import app, { auth } from "./firebase/config"
import Login from "./components/Login"
import { onAuthStateChanged } from "firebase/auth"
import SellProducts from "./components/SellProducts"
import ProductDetails from "./components/ProductDetails"

export const UserContext = createContext(null)
const addRoute = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <Home />

      },
      {
        path: '/sellProduct',
        element: <SellProducts />
      },
      {
        path: '/productDetails',
        element: <ProductDetails />

      },
    ]

  },
  {
    path: '/login',
    element: <Login />

  },
  {
    path: '/signup',
    element: <SignUp />
  }
])


function App() {

  const [user, setuser] = useState('')
  const [post, SetPost] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
      }
    })

  }, [])




  return (
    <FirebaseContext.Provider value={{ app }} >
      <UserContext.Provider value={{ user, setuser }}>
        <PostContext.Provider value={{ post, SetPost }} >
          <RouterProvider router={addRoute} >
            <Body />
          </RouterProvider>
        </PostContext.Provider>
      </UserContext.Provider>
    </FirebaseContext.Provider>

  )
}

export default App
