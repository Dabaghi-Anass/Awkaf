import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Components/Header'

const ZakactCal = () => {
  return (
    <>
      <Header></Header>
        <div>ZakactCal</div>
            <Link to={"/"}>Take me Home</Link>
            <Link to={"/About"}>Take me About</Link>
    
    </>
    
  )
}

export default ZakactCal