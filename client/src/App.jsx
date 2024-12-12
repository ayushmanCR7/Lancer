import React from "react"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Add from "./routes/add/Add"
import Home from "./routes/home/Home";
import Gig from "./routes/gig/Gig";
import Gigs from "./routes/gigs/Gigs";
import Login from "./routes/login/Login";
import Message from "./routes/message/Message";
import Messages from "./routes/messages/Messages";
import Mygigs from "./routes/mygigs/Mygigs";
import Orders from "./routes/orders/Orders";
import Register from "./routes/register/Register";

import { Requiredlayout,Layout } from "./components/layout/Layout";
import Success from "./routes/success/Success";
import Pay from "./routes/pay/pay";
function App() {
  const router = createBrowserRouter([
     {
       path: "/",
       element: <Layout/>,
       children:[
           {
            path: "/",
            element: <Home/>
           },
           {
            path: "/login",
            element: <Login/>
           },
          
           {
            path: "/register",
            element: <Register/>
           },
           
         {
          path: "/gigs",
          element: <Gigs/>
         },
       ]
     },
     {
      path: "/",
      element: <Requiredlayout/>,
      children:[
        {
          path: "/add",
          element: <Add/>
         },
         {
          path: "/gig/:id",
          element: <Gig/>
         },
         {
          path: "/message/:id",
          element: <Message/>
         },
         {
          path: "/messages",
          element: <Messages/>
         },
         {
          path: "/mygigs",
          element: <Mygigs/>
         },
         {
          path: "/orders",
          element: <Orders/>
         },
         {
          path: "/success",
          element: <Success/>
         },
         {
          path: "/pay/:id",
          element: <Pay/>
         }
         
      ]


     }
  ])

  return (
    <>
     <RouterProvider router = {router}/>
    </>
  )
}

export default App
