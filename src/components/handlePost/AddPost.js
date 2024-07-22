import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Global from '../../global/variables';
import NavBar from '../Navbar/Navbar'
import './post.css'
import {useNavigate} from 'react-router-dom';

const AddPost = ({handleShow, handleClose, show}) => {
  // const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [submit, setSubmit] = useState(false)
  const [image, setImage] = useState("")
  const[titleOnClick, setTitleOnClick] = useState(false)
  const[descriptionOnClick, setDescriptionOnClick] = useState(false)
  const [tagOnClick, setTagOnClick] = useState(false)
  const [imageAlert, setImageAlert] = useState(false)
  const [fieldsAlert, setFieldsAlert] = useState(false)
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const [message, setMessage] = useState("")

  const handleAddPost = () => {
      navigate('/login')
  }

  const handleAddTag = () => {
    if(tag.trim() == ""){
      setFieldsAlert(true)
      setMessage("Enter the tag first.")
    }
    else{
    setTags([...tags, tag])
    setTag("")
  }
  }

  const handleRemoveTag = (tagName) => {
    let tagData = tags
    const resultedTags = tagData.filter((data) => {
      return data != tagName
    })
    setTags(resultedTags)
  }

  const handleFile = (e) => {
    if(e.target.files){
      if(e.target.files[0].type.includes('image')){
        setImage(e.target.files[0])
        console.log(image)
      }
      else{
        setImageAlert(true)
        setMessage("File you uploaded is not an image. Try Again!!!")
        setImage("")

      }
    }
  }

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "" || !image?.type?.includes('image') || tags?.length === 0){
      setFieldsAlert(true)
      setMessage("Fill in all the required fields!!!")
    }
    else {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('email', subTitle)
      formData.append('description', description)
      formData.append('user_id', localStorage.getItem('user_id'))
      formData.append('tags', tags)
      formData.append('image', image)
      console.log(formData)
      console.log(tags)
      const requestOptions = {
        method : 'POST',
        body : formData
      }

      const response = await fetch(`${Global.proxy}/blog/insert_blog`, requestOptions)
      const data = await response.json()
      if (data?.resp?.acknowledgment == 'success'){
        navigate(`/blog/${data?.resp?._id}`)
      }
    }
  }

  useEffect(() => {
    setTitle("")
    setDescription("")
    setSubTitle("")
    setTag("")
    setTags([])
    setTitleOnClick(false)
    setDescriptionOnClick(false)
    setTagOnClick(false)
  }, [show])

  useEffect(()=> {
    setTimeout(() => {
      if (imageAlert){
      setImageAlert(false)
    }
    else if (fieldsAlert){
      setFieldsAlert(false)
    }
    },5000)
  }, [imageAlert, fieldsAlert])

  return (
    <>
    {
      localStorage?.getItem('user_id')?.length > 0 ?
    <>
      <NavBar />
      <div style={{marginLeft:'10%', marginRight:'10%', marginBottom:'10%', marginTop:'3%'}}>
      <center>
      <div className="mb-3">
      <span className="blog-font" style={{fontSize:"3rem"}}> Write a New Blog </span>
      </div>
      </center>
      {
        imageAlert || fieldsAlert ?
        <Alert variant="danger" onClose={() => setImageAlert(false)}>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert> : ""
      }
        <Modal.Body>
        <FloatingLabel
        controlId="floatingInput"
        label={"Title"}
        className="mb-3"
      >
        <Form.Control type="text" value={title} onClick={() => setTitleOnClick(true)} onChange={(e) => setTitle(e.target.value)} placeholder="Title" isValid={title.trim() !== ""} isInvalid={titleOnClick && title.trim() === ""}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Tags"
        className="mb-3"
        >
      <Form.Control type="text" value={tag} onClick={() => setTagOnClick(true)} onChange={(e) => setTag(e.target.value)} placeholder="Tags" isValid={tag.trim() !== ""} isInvalid={tagOnClick && tags.length === 0}/>
      <div className="mb-2"></div>
      <div className="mb-3">
      <button class="btn btn-outline-secondary" style={{marginRight:10}} type="button" onClick={handleAddTag}>
      Add &nbsp;
      <FontAwesomeIcon icon={faPlus} size={'l'}/>
      </button>
      <br/>
      <br/>
      {
        tags?.map( (tagName) => {
          return(
            <>
            <span style={{border:'1px solid black', borderRadius: 10, padding:5, marginRight:10}}>{tagName} <span style={{cursor:'pointer'}}> <FontAwesomeIcon onClick={() => handleRemoveTag(tagName)} icon={faTimes} size={'1x'}/> </span></span> &nbsp; &nbsp;
            </>
          )
        })
      }

      </div>
    </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '200px'}}
          value = {description}
          onClick = {() => setDescriptionOnClick(true)}
          onChange = {(e) => setDescription(e.target.value)}
          isValid={description.trim() !== ""}
          isInvalid={descriptionOnClick && description.trim() === ""}
        />
        </FloatingLabel>
        <label className="form-label mb-3" for="customFile">Image Upload</label>
        <input type="file" onChange={(e) => handleFile(e)} class="form-control form-control-lg" id="customFile" isInvalid={false} />
        <div className="d-flex justify-content-end" style={{marginTop:40}}>
        <Button variant="primary" onClick={handleSubmit}>
              Save Changes
        </Button>
        </div>
        </Modal.Body>
      </div>
    </> :
    <>
    {navigate('/login')} </>
  }
  </>
  )
}

export default AddPost;
