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
import DeletePost from '../handlePost/DeletePost'
import Modal from 'react-bootstrap/Modal';
import PageTitle from '../utils/PageTitle'

const Blog = () => {
  const params = useParams();
  const { id } = useParams()
  const [data, setData] = useState([])
  const [comment, setComment] = useState("")
  const [commentOnClick, setcommentOnClick] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loader, setLoader] = useState(true)
  const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false)
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
  const [deleteComment, setDeleteComment] = useState({})

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
    if(resp?.success == true){
    setData(resp?.res)
    setLoader(false)
  }else{
    navigate('/page_not_found')
  }
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
    setErrorMessage("User Not Logged In!!!")
    setTimeout(() => {
      setError(false)
      setErrorMessage("")
    }, 7000)
  }
    setComment("")
    get_blog()
    setcommentOnClick(false)
  }

  const handleBlogModalCancel = () => {
    setShowDeleteBlogModal(false)
  }

  const handleCommentModalCancel = () => {
    setShowDeleteCommentModal(false)
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

  const handleCommentDelete = async (comment) => {
    const req_data = {
      blog_id: data[0]._id,
      user_id: comment.user_id,
      comment: comment.comment
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
      setError(true)
      setErrorMessage("User Not Logged In!!!")
      setTimeout(() => {
        setError(false)
        setErrorMessage("")
      }, 7000)
    }
    setShowDeleteCommentModal(false)
  }

  return(
    <>
    <NavBar />
    { loader ?
      <Loader /> :
      <>
    {
      error ?
      <div class="alert alert-danger" style={{top:100, right:0, marginRight: 10, position:'fixed'}} role="alert">
        {errorMessage}
      </div>
      : ""
    }
    {
      data?.length > 0 ?
      <div style={{marginBottom:'10%', marginTop:'3%',marginLeft:'10%', marginRight:'10%',objectFit:'cover'}}>
      <PageTitle title={`${data[0].title} | The Blog`} />
      <center>
      <div>
      <img src={`data:image/png;base64,${data[0].image}`} style={{maxHeight:'1000px',width:'80%'}}/>
      <div className="mt-3"> </div>
      <span className="blog-font" style={{fontSize:'3rem'}}>{data[0].title}</span>
      <div className="mt-3"> </div>
      </div>
      </center>
      <div style={{textAlign:'justify', textJustify:'inter-word'}} >
        <div className="blog-font mt-2" style={{fontWeight:'250', whiteSpace: "pre-wrap"}}> {data[0].description} </div>
        <div className="mt-4">
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
        <div className="blog-font mt-2" style={{fontSize:'1.5rem', fontWeight:700}}> Written by {data[0].user_name} </div>
      </div>
      <div className="mt-3"> </div>
      <span className="blog-font" style={{fontSize:'2rem'}}> Comments </span>
      <br />
      <FloatingLabel className="mb-3 mt-1" controlId="floatingTextarea2" label="Leave a comment here">
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

      <div>
      <div className="d-flex justify-content-end">
      <Button variant="primary" onClick={handleSubmit}>
        Post Comment
      </Button>
      </div>
      { data[0]?.comments?.length > 0 ?
      <div style={{marginLeft:'10%'}}>
      { data[0]?.comments?.map( (c) => {
        return(
          <div className="mt-5">
          <FontAwesomeIcon icon={faUser} size={'2xl'}/>
          <span className="blog-font" style={{fontWeight:300, fontSize:'1rem'}}> {c.user_name} </span>
          {
            localStorage.getItem('user_id') == c?.user_id ?
            <FontAwesomeIcon onClick={ () => {setShowDeleteCommentModal(true); setDeleteComment({user_id: c.user_id, comment:c.comment});}} icon={faTrash} size={'xl'} style={{color:'red', float:'right', cursor:'pointer', marginTop:8}} /> : ""
          }
          <br />
          <span className="blog-font" style={{fontWeight:300, fontSize:'1rem'}}>{handleDate(c.time)}</span>
          <br />
          <br />
          <span className="blog-font" style={{fontWeight:300, fontSize:'1.2rem', whiteSpace:'pre-wrap'}}> {c.comment} </span>
          <hr />
          </div>
        )
      }
      )}
      </div> : ''
    }
    </div>
    <div className="mt-3 d-flex justify-content-end">
      {
        localStorage.getItem('user_id') == data[0]?.user_id  ?
        <Button className="mb-4" variant="danger" onClick={() => setShowDeleteBlogModal(true)}>
          Delete Blog
        </Button>
        : <Button className="mb-4" variant="danger" onClick={() => setShowDeleteBlogModal(true)} disabled>
          Delete Blog
        </Button>
      }
      </div>
      </div>
      :
       ""
     } </>
      }
      <DeletePost showDeleteModal={showDeleteBlogModal} handleCancel = {handleBlogModalCancel} handleDelete = {handleBlogDelete} text={"Are you sure want to delete this post?"} type={"Post"}/>
      <DeletePost showDeleteModal={showDeleteCommentModal} handleCancel = {handleCommentModalCancel} handleDelete = {() => handleCommentDelete(deleteComment)} text={"Are you sure want to delete this comment?"} type={"Comment"}/>
    </>
  )
}


export default Blog;
