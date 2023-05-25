import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import loginImage from '../../images/login.jpeg'
import './authentication.css'
import NavBar from '../Navbar/Navbar';
import {useNavigate} from 'react-router-dom';
import Global from '../../global/variables';


const Login = () => {
  const [email, setEmail] = useState("")
  const [emailOnClick, setEmailOnClick] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordOnClick, setPasswordOnClick] = useState(false)
  const navigate = useNavigate();

  const handleClick = async () => {
    const data = {
      email: email,
      password: password
    }
    const response = await fetch(`${Global.proxy}/blog/login`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const resp = await response.json()
    console.log(resp)
    if (resp?.success == true){
      // window.user_name = resp.name
      localStorage.setItem('user_name', resp.name)
      localStorage.setItem("user_id", resp._id)
      // console.log(localStorage.getItem('user_name'))
      navigate("/")
      // setUserName(resp.name)
    }

  }


  return (
    <div style={{backgroundColor:"#f1f1f1", height:'100vh'}}>
    <NavBar />
    <center >
      <div className="row" style={{width:'53.5%', margin: 'auto', marginTop:'10%'}}>
          <div className="col-lg-6 col-md-12 col-sm-12" style={{backgroundColor:'white', paddingRight:0}}>
          <div style={{margin:'auto', height:600, padding:50}}>
              <center>
                <h1>Welcome Back!</h1>
                Welcome Back! Please enter your details.
                <FloatingLabel
                controlId="floatingInput"
                label={"Email"}
                className="mb-3 mt-5"
              >
                <Form.Control type="email" value={email}
                  style={{width:'100%'}}
                  onClick={() => setEmailOnClick(true)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  isValid={email.trim() !== ""}
                  isInvalid={emailOnClick && email.trim() === ""}/>
              </FloatingLabel>
              <FloatingLabel
              controlId="floatingInput"
              label={"Password"}
              className="mb-3"
            >
              <Form.Control type="password" value={password}
                onClick={() => setPasswordOnClick(true)}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                isValid={password.trim() !== ""}
                isInvalid={passwordOnClick && password.trim() === ""}/>
            </FloatingLabel>
            <span className="hover-dark-color" style={{float:'right', cursor:'pointer', textDecoration:'underline'}}>Forgot Password</span>
            <br />
            <br />
            <br />
            <div className="d-grid gap-2">
            <Button variant="secondary" onClick={handleClick} size="lg">Login</Button>
            </div>
            <br />
            <br />
            <div >
            <p>Don't have an account? <a className="hover-dark-color" href="/signup" style={{cursor:'pointer'}}>Sign Up</a></p>
            </div>
              </center>
              </div>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12" style={{paddingLeft:'0px'}}>
          <img src={loginImage} style={{height:600, objectFit:'scale-down'}}/>
          </div>
        </div>
      </center>
      </div>
  )
}

export default Login;
