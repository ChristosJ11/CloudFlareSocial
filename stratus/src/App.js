import LoginPage from './components/loginPage'
import ScrollPage from './components/ScrollPage'
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export const UserContext= React.createContext()

function App() {
  const[username, changeUsername]= useState('')
  const changeUser=(tempUser)=>{
    changeUsername(tempUser)
  }
  return (
    <div className="App" style={{overflow:'hidden'}}>
      <div className='topBanner'>
        <div className='mediumFont'>STRATUS</div>
      </div>
      
      
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage changeuser={changeUser} />}/> 
        </Routes>
     
        <UserContext.Provider value={username}>
       <Routes>
        <Route path="/scrollPage" element={<ScrollPage/>}/> 
        </Routes>
        </UserContext.Provider>
      
     
     </Router>
     
    </div>
  )
}

export default App;
