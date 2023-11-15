import React from 'react'
import { Link } from 'react-router-dom';
import { SiAtom } from "react-icons/si";
import './Header.css'
const Header = () => {
  return (
   <>
   <div className='Nav'>
   <div className="logo">
    <h1>CryptoVerse </h1>
    <SiAtom color='orange' size={'25'} style={{marginLeft:'10px'}} />
    </div>
   <ul>
    <li> <Link to='/'>Home</Link></li>
    <li> <Link to='/coins'>Coins</Link></li> 
   </ul>
   </div>
   </>
  )
}

export default Header
