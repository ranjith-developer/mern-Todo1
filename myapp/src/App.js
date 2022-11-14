import React, {useState} from  "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from "./pages/Register"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"

import './App.css';

export const CredentialsContext = React.createContext();

const App = () => {
  const credentialsState = useState({
    username: 'ranjith'
  });

  return (
    <div>
      <CredentialsContext.Provider value={credentialsState}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CredentialsContext.Provider>
    </div>
  )
}

export default App