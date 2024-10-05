import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import loginImage from '../../images/login.jpeg'
import Alert from 'react-bootstrap/Alert';
import NavBar from '../Navbar/Navbar';
import { useNavigate, Navigate } from "react-router-dom";
import Global from '../../global/variables';
import './authentication.css'


const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nameOnClick, setNameOnClick] = useState(false)
  const [emailOnClick, setEmailOnClick] = useState(false)
  const [passwordOnClick, setPasswordOnClick] = useState(false)
  const [confirmPasswordOnClick, setConfirmPasswordOnClick] = useState(false)
  const [inputFieldAlert, setInputFieldAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  let navigate = useNavigate();

  const handleSignUp = async () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || password !== confirmPassword){
      setInputFieldAlert(true)
      setErrorMessage("Please Fill in the required Fields!!!")
    }
    else{
      signUp()
    }
  }

  const signUp = async () => {
    const data = {
      user_name: name,
      email: email,
      password: password,
    }
    const response = await fetch(`${Global.proxy}/blog/sign_up`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const resp = await response.json()
    if(resp?.success == true){
      localStorage.setItem('user_name',resp?.data[0]?.name)
      localStorage.setItem('user_id', resp?.data[0]?._id)
      navigate("/")
    }
    else{
      setInputFieldAlert(true)
      setErrorMessage(resp?.error)
    }
  }

  useEffect( () => {
    setTimeout( () => {
      setInputFieldAlert(false)
      setErrorMessage("")
    }, 7000 )
  }, [inputFieldAlert])


  return (
    <>
    {
      inputFieldAlert &&
        <div class="alert alert-danger" style={{top:100,right:0, marginRight: 10, position:'fixed'}} role="alert">
          {errorMessage}
        </div>

    }
    { localStorage.getItem('user_name')?.length > 0 ?
    <Navigate to="/" />
      :
    <div className="" style={{backgroundColor:"#f1f1f1", minHeight:700, height:'100vh'}}>
    <NavBar />
      <div className="row" style={{ height:'90%', margin: 'auto', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div className="col-lg-6 col-md-12 col-sm-12" style={{borderRadius:20, backgroundColor:'white', paddingRight:0, paddingBottom:30, paddingTop:30, width:'500px'}}>
          <div style={{margin:'auto', width:'80%'}}>
              <center>
                <h1>Sign Up!</h1>
                <FloatingLabel
                controlId="floatingInput"
                label={"Name"}
                className="mb-3 mt-5"
              >
                <Form.Control type="text" value={name}
                  style={{width:'100%'}}
                  onClick={() => setNameOnClick(true)}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  isValid={name.trim() !== ""}
                  isInvalid={nameOnClick && name.trim() === ""}/>
              </FloatingLabel>
                <FloatingLabel
                controlId="floatingInput"
                label={"Email"}
                className="mb-3"
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
            <FloatingLabel
            controlId="floatingInput"
            label={"Confirm Password"}
            className="mb-3"
          >
            <Form.Control type="password" value={confirmPassword}
              onClick={() => setConfirmPasswordOnClick(true)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              isValid={confirmPassword === password && confirmPassword.trim() !== ""}
              isInvalid={confirmPasswordOnClick && (confirmPassword != password || confirmPassword.trim() === "")}/>
          </FloatingLabel>
            <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" onClick={handleSignUp}>Sign Up</Button>
            </div>
            <div className="mt-3">
            <p>Already a user? <a className="hover-dark-color" href="/login" style={{cursor:'pointer'}}>Sign In</a></p>
            </div>
              </center>
              </div>
          </div>
        </div>
    </div>
  }
  </>
  )
}

export default SignUp;
