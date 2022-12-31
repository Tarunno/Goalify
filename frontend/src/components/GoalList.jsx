const GoalList = ({goals, handleDelete, handleUpdate}) => {
  return (
    <div className="goals">
      {goals.length === 0? <h3 style={{color: 'red'}}>⛳ No current goal</h3>:null}
      {goals.map((goal) => (
        <div className="goal" key={goal._id}>
          <div className="info">
            <p>🏹 {goal.text}</p>
          </div>
          <div className="actions">
            <p title='Done' onClick={() => handleDelete(goal._id)}>💘</p>
            <p title='Edit' onClick={() => handleUpdate(goal._id, goal.text)}>🔨</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GoalList
