import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Keyboard from '../../images/keyboard.jpg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './card.css'
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeletePost from '../handlePost/DeletePost'
import { useNavigate } from 'react-router-dom';

const BlogCard = ( {data} ) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowDeleteModal(false)
  }

  const handleDelete = () => {
    setShowDeleteModal(false)
  }

  const handleClick = () => {

  }

  const handleDate = (date) => {
    const d = date.split(" ")

    return d[0].replace(new RegExp("/", 'g'), "-")
  }
  return(
    <div className="row">
    {data?.resp?.length > 0 ?
      data.resp.map((d, idx) => {
      return(
        <div className={(idx+1)%3 === 0 ? "col-lg-4 col-sm-12 col-md-6" : "mr-5 col-lg-4 col-sm-12 col-md-6"} style={{marginTop:80}}>
            <img src={`data:image/png;base64,${d.image}`} style={{height:'300px', width:'100%', objectFit:'cover', cursor:'pointer'}} onClick={() => { navigate(`/blog/${d._id}`) }}/>
            <div className="mt-3"> </div>
            <div>
            <div onClick={() => { navigate(`/blog/${d._id}`) }} style={{cursor:'pointer'}}>
            <span className="blog-font" style={{fontSize:15, fontWeight: 700}}>{d.user_name}  {handleDate(d.date)}</span>
            <br />
            <span className="blog-font" style={{fontSize:20, fontWeight: 700}}>{d.title.substring(0,40)}{d.title.length > 40 ? "..." : ""}</span>
            <br />
            <span className="blog-font" style={{fontWeight:500}}>{d.description.substring(0, 100)}{d.description.length > 100 ? "..." : ""}</span>
            </div>
            <div className="mt-3">
            {
              d?.tags?.map((tag) => {
                return(
                  <div className="tags" onClick={() => { navigate(`/blogs/${tag}`) }} style={{border:'1px solid grey', borderRadius: 10, padding:5, marginRight:10, display:'inline-block', marginBottom:10}}>
                    {tag}
                  </div>
                )
              })
            }
            </div>
            </div>
        </div>
      )
    }) : 'Loading'

  }
    </div>
  )
}

export default BlogCard;
