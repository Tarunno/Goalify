import { useState, useEffect } from "react"
import { FiX } from "react-icons/fi";


const Modal = ({changeStatus, message, type}) => {
  useEffect(() => {
    setTimeout(() => {
      changeStatus(false)
    }, 3000)
  }, [message])
  return (
    <div className="modal">
      <div className="message">
        <div>{message}</div>
        <p className="close" onClick={() => changeStatus(false)}><FiX/></p>
      </div>
      <div className={type}></div>
    </div>
  )
}

export default Modal
