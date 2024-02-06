import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './pages/Home'
import Locations from './pages/Location'
import Episodes from './pages/Episodes'
import Card from './components/card'

const router = createBrowserRouter([{
  path: '/',
  element: <Home/>, 
  children: [{
    path: '/id?',
    element: <Card/>
  }]
},
{
  path: '/location',
  element:<Locations/>
},
{
  path: '/episodes',
  element: <Episodes/>
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
