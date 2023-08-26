import React, {useState, useEffect} from 'react';
import { useHistory ,useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import NavBar from '../Navbar/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import Global from '../../global/variables';
import Loader from '../utils/Loader';

const Blog = () => {
  const params = useParams();
  const { id } = useParams()
  const [data, setData] = useState([])
  const [comment, setComment] = useState("")
  const [commentOnClick, setcommentOnClick] = useState(false)
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(true)

  const navigate = useNavigate();
  useEffect( () => {

    get_blog()
  }, [])

  const get_blog = async () => {
    const req_data = {
      id: id
    }
    const requestOptions = {
      method : 'POST',
      body : JSON.stringify(req_data)
    }

    const response = await fetch(`${Global.proxy}/blog/get_blog`, requestOptions)
    const resp = await response.json()
    setData(resp)
    setLoader(false)
  }

  const handleDate = (date) => {
    const d = date.split(" ")

    return d[0].replace(new RegExp("/", 'g'), "-")
  }

  const handleSubmit = async() => {
    if (localStorage.getItem('user_id')?.length > 0 ){
      const req_data = {
        id: id,
        comment: comment,
        user_id : localStorage.getItem('user_id')
      }
      const requestOptions = {
        method : 'POST',
        body : JSON.stringify(req_data)
      }

      const response = await fetch(`${Global.proxy}/blog/post_comment`, requestOptions)
      const data = await response.json()
  }
  else{
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 7000)
  }
    setComment("")
    get_blog()
    setcommentOnClick(false)
  }

  const handleBlogDelete = async () => {
    const req_data  ={
      blog_id : data[0]._id,
      user_id: data[0].user_id
    }
    const response = await fetch(`${Global.proxy}/blog/delete_blog`, {
      method: 'DELETE',
      body: JSON.stringify(req_data)
    })
    const resp = await response.json()
    if (resp?.success == true){
      navigate('/')
    }
  }

  const handleCommentDelete = async (user_id, comment) => {
    const req_data = {
      blog_id: data[0]._id,
      user_id: user_id,
      comment: comment
    }
    const response = await fetch(`${Global.proxy}/blog/delete_comment`,{
      method: 'DELETE',
      body: JSON.stringify(req_data)
    })
    const resp = await response.json()
    if (resp?.success == true){
      get_blog()
    }
    else {

    }
  }

  return(
    <>
    <NavBar />
    { loader ?
      <Loader /> :
      <>
    {
      error ?
      <div class="alert alert-danger" style={{right:0, marginRight: 10, position:'fixed'}} role="alert">
        User not Logged In!!!
      </div>
      : ""
    }
    {
      data?.length > 0 ?
      <div style={{marginBottom:'10%', marginTop:'3%',marginLeft:'10%', marginRight:'10%',objectFit:'cover'}}>
      <center>
      <div>
      <img src={`data:image/png;base64,${data[0].image}`} style={{maxHeight:'1000px',width:'80%'}}/>
      <div className="mt-3"> </div>
      <span className="blog-font" style={{fontSize:'3rem'}}>{data[0].title}</span>
      <div className="mt-3"> </div>
      </div>
      </center>
      <div style={{textAlign:'justify', textJustify:'inter-word'}} >
        <div className="blog-font" style={{fontWeight:'250'}}>{data[0].description}</div>
        <div className="mt-5">
          {
            data[0]?.tags.map((tag) => {
              return(
              <div className="blog-font tags" onClick={()=> {navigate(`/blogs/${tag}`)}} style={{border:'1px solid grey', borderRadius:10, display:'inline-block', marginRight:20, marginBottom:20, padding:10}}>
                  {tag}
              </div>
            )
            })
          }
        </div>
        <div className="blog-font mt-5" style={{fontSize:'1.5rem', fontWeight:700}}> Written by {data[0].user_name} </div>
      </div>
      <div className="mt-5"> </div>
      <span className="blog-font" style={{fontSize:'2rem'}}> Comments </span>
      <br />
      <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Leave a comment here">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '200px'}}
        value = {comment}
        onClick = {() => setcommentOnClick(true)}
        onChange = {(e) => setComment(e.target.value)}
        isValid={comment.trim() !== ""}
      />
      </FloatingLabel>

      <Button variant="primary" onClick={handleSubmit} style={{float:'right'}}>
        Post Comment
      </Button>
      <div style={{marginTop:100, marginLeft:'10%'}}>
      { data[0]?.comments?.map( (c) => {
        return(
          <div className="mt-5">
          <FontAwesomeIcon icon={faUser} size={'2xl'}/>
          <span className="blog-font" style={{fontWeight:300, fontSize:'1rem'}}> {c.user_name} </span>
          {
            localStorage.getItem('user_id') == c?.user_id ?
            <FontAwesomeIcon onClick={() => handleCommentDelete(c.user_id, c.comment)} icon={faTrash} size={'xl'} style={{color:'red', float:'right', cursor:'pointer'}} /> : ""
          }
          <br />
          <span className="blog-font" style={{fontWeight:300, fontSize:'1rem'}}>{handleDate(c.time)}</span>
          <br />
          <br />
          <span className="blog-font" style={{fontWeight:300, fontSize:'1.2rem'}}> {c.comment} </span>
          <hr />
          </div>
        )
      }

      )
      }
      </div>
      {
        localStorage.getItem('user_id') == data[0]?.user_id  ?
        <Button className="mb-4" variant="danger" onClick={handleBlogDelete} style={{float:'right'}}>
          Delete Blog
        </Button>
        : <Button className="mb-4" variant="danger" onClick={handleBlogDelete} style={{float:'right'}} disabled>
          Delete Blog
        </Button>
      }
      </div>
      :
       ""
     } </>
      }
    </>
  )
}

export default Blog;
