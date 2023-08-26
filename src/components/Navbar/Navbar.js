import Nav from 'react-bootstrap/Nav';
import {useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import AddPost from '../handlePost/AddPost'
import './navbar.css';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(localStorage.getItem('user_name'))
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  let navigate = useNavigate();

  console.log(window.location.href)

  const handleSignOut = () => {
    localStorage.setItem('user_name', "")
    localStorage.setItem("user_id","")
    navigate("/")
  }
  useEffect(() => {
    setUser(localStorage.getItem('user_name'))
  }, [localStorage.getItem('user_name')])
  return(
    <>
    <Navbar bg="white" variant="light">
          <Navbar.Brand className="on-hover" style={{marginLeft:50, fontFamily:'helvetica'}} href="/">Home</Navbar.Brand>
          { localStorage.getItem("user_name")?.length > 0 && window.location.pathname == '/' ?
          <Nav className="me-auto ml-5">
            <Nav.Link className="on-hover" style={{fontSize:20, marginLeft: 20, fontFamily:'helvetica'}} onClick = {handleShow}>Add Post</Nav.Link>
          </Nav> : <> </>
          }
          <Nav className="ms-auto ml-5">
          { localStorage.getItem('user_name')?.length > 0 ?
            <>
            <Nav.Link className="" style={{fontSize:20, fontFamily:'helvetica', marginRight:10, color:"black"}} >
            <FontAwesomeIcon icon={faCircleUser} /> &nbsp;
            {localStorage.getItem('user_name')}
            </Nav.Link> &nbsp; &nbsp; &nbsp;
            <Nav.Link className="on-hover" style={{fontSize:20, fontFamily:'helvetica', marginRight:50}}  onClick={handleSignOut}>Sign Out</Nav.Link>
            </>
            :
            <>
            <Nav.Link className="on-hover" style={{fontSize:20, fontFamily:'helvetica', marginRight:10}}  href="/login">Login</Nav.Link> &nbsp; &nbsp; &nbsp;
            <Nav.Link className="nav-link-hover box" style={{fontSize:20, marginRight: 50, fontFamily:'helvetica', border:'1px solid black', borderRadius:10}}  href="/signup">Sign Up</Nav.Link>
            </>
          }
          </Nav>
      </Navbar>
      <AddPost handleShow={handleShow} handleClose={handleClose} show={show}/>
    </>
  )
}

export default NavBar;
