import { useState, useEffect } from "react"
import Input from "../components/Input"
import { userRegister } from "../api/authApi"
import Modal from "../components/Modal"

const Register = ({setLoggedIn}) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
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
    const data = await userRegister(userInfo)

    if(data['message']){
      setOpenModal(true)
      setModalType('error')
      setMessage(data['message'])
    }
    else{
      setModalType('success')
      setOpenModal(true)
      setMessage('Welcome ' + data.name)
      setLoggedIn(true)
    }
  }

  useEffect(() => {
    document.title = 'Register | GOALIFY'
  }, [])

  return (
    <div className="container">
      <h1> Register </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type={"text"}
          name={"name"}
          value={userInfo.name}
          placeholder={"Enter name"}
          onChange={(e) => handleChange(e)}
          required={true}
        />
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
          required={true}
        />
        <button className="login-btn"> Register </button>
      </form>
      {openModal?<Modal changeStatus={setOpenModal} message={message} type={modalType}/>:null}
    </div>
  )
}

export default Register 
