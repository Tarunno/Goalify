const Input = ({type, name, value, required, placeholder, onChange}) => {
  return (
    <div className="input">
      <input 
        type={type} 
        name={name} 
        value={value} 
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default Input
