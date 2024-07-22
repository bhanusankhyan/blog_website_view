import {useState} from 'react';
import NavBar from './components/Navbar/Navbar'
import './App.css'

const NotFound = () => {
  return(
    <>
    <NavBar />
    <div className="container blog-font" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
    <div className="centered-element">
      <h1>
        Page Not Found!!!
      </h1>
      </div>
    </div>
    </>
  )
}

export default NotFound;
