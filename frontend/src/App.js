import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.scss'

import Register from './pages/Register'
import Login from './pages/Login'
import Deshboard from './pages/Deshboard'
import Header from './components/Header'

import { isLoggedIn } from './api/authApi'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if(isLoggedIn()){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  }, [])

  return (
    <div className="App">
      <Router>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path='/' element={<Deshboard />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
