import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import loginImage from '../../images/login.jpeg'
import Alert from 'react-bootstrap/Alert';
import NavBar from '../Navbar/Navbar';
import { useNavigate, Navigate } from "react-router-dom";
import Global from '../../global/variables';


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

  let navigate = useNavigate();

  const handleSignUp = async () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || password !== confirmPassword){
      setInputFieldAlert(true)
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
    console.log(resp)
    if(resp?.success == true){
      localStorage.setItem('user_name',resp?.data[0]?.name)
      localStorage.setItem('user_id', resp?.data[0]?._id)
      navigate("/")
    }
    else{

    }
  }

  useEffect( () => {
    setTimeout( () => {
      setInputFieldAlert(false)
    }, 7000 )
  }, [inputFieldAlert])


  return (
    <>
    { localStorage.getItem('user_name')?.length > 0 ?
    <Navigate to="/" />
      :
    <div style={{backgroundColor:"#f1f1f1", height:'100vh'}}>
    <NavBar />
    {
      inputFieldAlert &&
      <Alert variant="danger" onClose={() => setInputFieldAlert(false)}>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        Please Fill in the required fields!!!
      </p>
    </Alert>
    }
    <center>
      <div className="row" style={{width:'53.5%', margin: 'auto', marginTop:'10%'}}>
          <div className="col-lg-6 col-md-12 col-sm-12" style={{backgroundColor:'white', paddingRight:0}}>
          <div style={{margin:'auto', height:600, padding:50}}>
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
            <br />
            <br />
            <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" onClick={handleSignUp} >Sign Up</Button>
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
  }
  </>
  )
}

export default SignUp;
