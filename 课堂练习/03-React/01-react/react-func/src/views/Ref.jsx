import React, { useRef } from 'react'

export default function Ref() {
    let inputDOM = useRef(null);    
    const changeVal = () => {
        console.log(inputDOM);
        
    }
  return (
      <div>
          <input type="text" name="" id="" ref={ inputDOM} />
            <button onClick={changeVal}>按钮</button>
      </div>
  )
}
