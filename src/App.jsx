import React from 'react'
import './App.css'
import Header from './component/header'
import Home from './pages/home'
import LoginModal from './component/login-modal'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
     <Header/>
     <Routes>
      <Route>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginModal/>}/>    
      </Route>
     </Routes>
    </>
  )
}

export default App
