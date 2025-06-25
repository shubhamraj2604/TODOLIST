import React from 'react'
import Navabar from './Components/Navabar'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo'
import { Toaster } from 'react-hot-toast'
import About from './Components/About'
import Footer from './Components/Footer'
const App = () => {
  return (
    <div className='min-h-screen' data-theme ="luxury">
       <Navabar />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/todo" element={<Todo />} />
        <Route path = "/about" element = {<About />} />
       </Routes>
       <Toaster />
       <Footer />
    </div>
  )
}

export default App