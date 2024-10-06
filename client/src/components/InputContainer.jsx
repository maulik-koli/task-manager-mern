import React, { forwardRef } from 'react'

const InputContainer = forwardRef(({lable, className, ...props}, ref) => {
  return (
    <div className={className}>
        <input 
          ref={ref}
          {...props}
          placeholder={`Enter ${lable}`} 
        />
        <label>{lable}</label>
    </div>
  )
})

export default InputContainer
