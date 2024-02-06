import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './pages/Home'
import Locations from './pages/Location'
import Episodes from './pages/Episodes'
import Card from './components/card'
import InfoCard from './pages/infoCards'

const router = createBrowserRouter([{
  path: '/',
  element: <Home/>
},
{
  path: '/location',
  element:<Locations/>
},
{
  path: '/episodes',
  element: <Episodes/>
},{
  path:'/:id',
  element:<InfoCard/>
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
