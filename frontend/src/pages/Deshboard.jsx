import { useState, useEffect } from "react"
import {isLoggedIn} from '../api/authApi'
import {useNavigate} from 'react-router-dom'
import Loading from "../components/Loading"
import GoalList from "../components/GoalList"
import AddGoal from "../components/AddGoal"
import { getGoals, addGoals, deleteGoals, updateGoals } from "../api/goalApi"

const Deshboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [goals, setGoals] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [currText, setCurrText] = useState({id:'', text:''})

  const loading = async() => {
    setIsLoading(true)
    if(user){
      const data = await getGoals(user)
      setGoals(data)
      setIsLoading(false)
    }
  }

  const handleAdd = async(e, text, id) => {
    e.preventDefault()
    if(id === ''){
      setIsLoading(true)
      const data = await addGoals(user, text);
      if(data['message']){
        console.log(data['message'])
      }
      else{
        await loading(user)
      }
    }
    else{
      setIsLoading(true)
      const data = await updateGoals(user, id, text);
      setCurrText({id:'', text:''});
      if(data['message']){
        console.log(data['message'])
      }
      else{
        await loading(user)
      }
    }
  }
  
  const handleDelete = async(id) => {
    setIsLoading(true)
    const data = await deleteGoals(user, id);
    if(data['message']){
      console.log(data['message'])
    }
    else{
      await loading(user)
    }
  }

  const handleUpdate = async(id, text) => {
    setCurrText({id:id, text:text});
  }

  useEffect(() => {
    document.title = 'Deshboard | GOALIFY'
    if(isLoggedIn()){
      const userInfo = isLoggedIn();
      setUser(userInfo)
    }
    else{
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    loading(user)
  }, [user])

  return (
    <>
      <div className="container">
        <h1>Deshboard</h1>
        <AddGoal handleAdd={handleAdd} currText={currText}/>
        {isLoading? <Loading/>: <GoalList 
          goals={goals} 
          handleDelete={handleDelete} 
          handleUpdate={handleUpdate}/>}
      </div>
    </>
  )
}

export default Deshboard
