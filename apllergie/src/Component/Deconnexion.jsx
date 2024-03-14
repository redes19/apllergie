import React from 'react'

export default function Deconnexion({setIsLogin}) {

    const handleClick = () => {
        localStorage.setItem('isLogin', false);
        setIsLogin(false);
        console.log(localStorage);
    }

  return (
    <div>
        <button onClick={handleClick}>Déconnexion</button>
    </div>
  )
}
