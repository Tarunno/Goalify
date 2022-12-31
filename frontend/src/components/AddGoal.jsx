import { useEffect } from 'react'
import { useState } from 'react'
import Input from './Input'

const AddGoal = ({handleAdd, currText}) => {
  const [text, setText] = useState(currText)

  const handleChange = (e) => {
    setText({...text, text:e.target.value})
  }

  useEffect(() => {
    setText(currText)
  }, [currText])

  return (
    <div className='add-goal'>
      <form onSubmit={(e) => {
        handleAdd(e, text.text, text.id)
        setText({id:'', text:''})
      }}>
        <Input 
          type={'text'}
          name={'text'}
          placeholder={'Add new goal'}
          value={text.text}
          onChange={(e) => handleChange(e)}
          required={true}
        />
        <button onClick={() => setText({id:'', text:''})} title={text.id !== ''? "Mode: Update": "Mode: Add"} >{text.id !== ''? '💛':'💚' }</button>
        <button title="Add" type="submit">🎯</button>
      </form>
    </div>
  )
}

export default AddGoal