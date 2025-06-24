import { StrictMode } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import Age_calculator from './components/Age_calculator/Age_calculator.jsx'
import Countdown from './components/Countdown/Countdown.jsx'
import Reminder from './components/Reminder/Reminder.jsx'
import Birthday_card from './components/Birthday_card/Birthday_card.jsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />
      <Route path='/age_calculator' element ={<Age_calculator/>}/>
      <Route path='/countdown' element={<Countdown/>}/>
          <Route path='/reminder' element={<Reminder/>}/>
              <Route path='/birthday_card' element={<Birthday_card/>}/>
                 
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router} />   
  </StrictMode>,
)
