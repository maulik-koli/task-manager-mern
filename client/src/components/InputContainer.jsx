import React from 'react'

const InputContainer = ({lable, ...props}) => {
  return (
    <div {...props}>
        <input 
            {...props}
            placeholder={`Enter ${lable}`} 
        />
        <label>{lable}</label>
    </div>
  )
}

export default InputContainer
