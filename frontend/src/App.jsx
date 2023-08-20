import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import { Home } from "./LazyLoading";
import SocketProvider from './provider/SocketProvider';

const router = createBrowserRouter([
  {
    path : "/",
    Component : Home,
    // errorElement : <h1>Kuchh to gadbad hai Daya 😔</h1>
  }
])


const App = () => {
  return (
    
    <SocketProvider>
    <RouterProvider router={router}/>
    </SocketProvider>

    )
}

export default App