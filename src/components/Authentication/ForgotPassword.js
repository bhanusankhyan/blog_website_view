import {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import loginImage from '../../images/login.jpeg'
import './authentication.css'
import NavBar from '../Navbar/Navbar';
import {useNavigate} from 'react-router-dom';
import Global from '../../global/variables';


const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [emailOnClick, setEmailOnClick] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordOnClick, setPasswordOnClick] = useState(false)
  const [reEnterPassword, setReEnterPassword] = useState('')
  const [reEnterPasswordOnClick, setReEnterPasswordOnClick] = useState(false)
  const [inputFieldAlert, setInputFieldAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  console.log(password)
  console.log(reEnterPassword)

  const handleChangePassword = () => {
    if(email.trim() == "" || password.trim() == "" || reEnterPassword.trim() == ""){
      setInputFieldAlert(true)
      setErrorMessage("Please Fill in the required fields")
    }
    else if(password.trim() != reEnterPassword.trim()){
      setInputFieldAlert(true)
      setErrorMessage("Both passwords should match.")
    }
    else{
      handleClick()
    }
  }

  const handleClick = async () => {
    const data = {
      email: email,
      password: password
    }
    const response = await fetch(`${Global.proxy}/blog/forgot_password`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const resp = await response.json()
    // console.log(resp)
    if (resp?.success == true){
      // window.user_name = resp.name
      localStorage.setItem('user_name', resp.name)
      localStorage.setItem("user_id", resp._id)
      // console.log(localStorage.getItem('user_name'))
      navigate("/login")
      // setUserName(resp.name)
    }
    else{
      setInputFieldAlert(true)
      setErrorMessage("Please Try Again!!!")
    }

  }

  useEffect( () => {
    setTimeout( () => {
      setInputFieldAlert(false)
      setErrorMessage("")
    }, 3000 )
  }, [inputFieldAlert])

  return (
    <>
    <NavBar />
    {
      inputFieldAlert &&
        <div class="alert alert-danger" style={{right:0, marginRight: 10, position:'fixed'}} role="alert">
          {errorMessage}
        </div>

    }
    <div style={{backgroundColor:"#f1f1f1",height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
    <center >
      <div className="row" style={{width:'70%', margin: 'auto'}}>
          <div className="col-lg-6 col-md-12 col-sm-12" style={{borderRadius:20, backgroundColor:'white', paddingRight:0, paddingBottom:30, paddingTop:30, width:'700px', display:'flex', alignItems:'center'}}>
          <div style={{margin:'auto',width:'80%'}}>
              <center>
                <h1>Change Password</h1>
                Enter the Details.
                <FloatingLabel
                controlId="floatingInput"
                label={"Email"}
                className="mb-3 mt-3"
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
            label={"Re Enter Password"}
            className="mb-3"
          >
            <Form.Control type="password" value={reEnterPassword}
              onClick={() => setReEnterPasswordOnClick(true)}
              onChange={(e) => setReEnterPassword(e.target.value)}
              placeholder="Re Enter Password"
              isValid={reEnterPassword.trim() !== "" && reEnterPassword == password}
              isInvalid={reEnterPasswordOnClick && reEnterPassword.trim() === "" }/>
          </FloatingLabel>
            <div className="d-grid gap-2">
            <Button variant="secondary" onClick={handleChangePassword} size="lg">Change Password</Button>
            </div>
            <br />
            <div >
            </div>
              </center>
              </div>
          </div>
        </div>
      </center>
      </div>
      </>
  )
}

export default ForgotPassword;
