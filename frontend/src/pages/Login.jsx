import { useState, useEffect } from "react"
import Input from "../components/Input"
import { userLogin } from "../api/authApi"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"

const Login = ({setLoggedIn}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const [message, setMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('eorror')

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await userLogin(userInfo)

    if(data['message']){
      setOpenModal(true)
      setModalType('error')
      setMessage(data['message'])
    }
    else{
      setModalType('success')
      setOpenModal(true)
      setMessage('Welcome back ' + data.name)
      setLoggedIn(true)
      return navigate('/')
    }
  }

  useEffect(() => {
    document.title = 'Login | GOALIFY'
  }, [])

  return (
    <div className="container">
      <h1> Login </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type={"email"}
          name={"email"}
          value={userInfo.email}
          placeholder={"Enter email"}
          onChange={(e) => handleChange(e)}
          required={true}
        />
        <Input
          type={"password"}
          name={"password"}
          value={userInfo.password}
          placeholder={"Enter password"}
          onChange={(e) => handleChange(e)}
        />
        <button className="login-btn"> Login </button>
      </form>
      {openModal?<Modal changeStatus={setOpenModal} message={message} type={modalType}/>:null}
    </div>
  )
}

export default Login 
