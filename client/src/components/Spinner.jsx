import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [count , setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount(count - 1);
        },1000);
        count === 0 && navigate('/');
        return () => clearInterval(interval);
    },[count , navigate])

  return (
    <div>
      <h1>Redirecting you in {count} ...</h1>
    </div>
  )
}

export default Spinner
