import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { FiLogIn, FiUserCheck, FiLogOut, FiMoreHorizontal } from "react-icons/fi";
import { isLoggedIn } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Header = ({loggedIn, setLoggedIn}) => {
  const navigate = useNavigate()
  const [ham, setHam] = useState(false)

  const logout = () => {
    if(isLoggedIn()){
      localStorage.removeItem('user')
      setLoggedIn(false)
    }
  }

  return (
    <>
      <header>
        <h1><Link to='/'> 🎯 G O A L <span className="logo">I F Y</span></Link></h1>
        <nav>
          <ul>
            <li><Link to='/login'><FiLogIn/> Login</Link></li>
            {loggedIn?<li><Link onClick={() => logout()} to='/login'><FiLogOut/> Logout</Link></li>:null}
            <li className="register-btn"><Link to='/register'><FiUserCheck/> Register</Link></li>
          </ul>
        </nav>
        <nav>
          <button className="hamburger-menu" onClick={() => setHam(!ham)}><FiMoreHorizontal/></button>
          {ham?<div onClick={() => setHam(!ham)} className="mobile-nav">
            <ul>
              <li><Link to='/login'><FiLogIn/> Login</Link></li>
              {loggedIn?<li><Link onClick={() => logout()} to='/login'><FiLogOut/> Logout</Link></li>:null}
              <li className="register-btn"><Link to='/register'><FiUserCheck/> Register</Link></li>
            </ul> 
          </div>:null}
        </nav>
      </header>
    </>
  )
}

export default Header