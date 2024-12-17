import React, { useEffect, useState } from 'react'

function Effect() {
  const [num, setNum] = useState(10);
  const changeNum = () => {
    setNum(num + 1);
  }
  useEffect(() => {
    console.log('effect被触发了');
    
  }, [num])
  
  useEffect(() => {
    console.log('组件挂载');
  }, [])
  
  useEffect(() => {
    console.log('数据改变');
  })
  
  useEffect(() => {
    return () => {
      console.log('组件被卸载');
    }
  })
  
  return (
    <div>
      { num }
      <button onClick={changeNum}>按钮</button>
    </div>
  )
}

export default Effect