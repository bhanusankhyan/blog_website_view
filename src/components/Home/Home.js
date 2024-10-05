import React, {useState, useEffect} from 'react';
import BlogCard from "../Card/Card"
import NavBar from '../Navbar/Navbar'
import './home.css'
import blog1 from '../../images/image2.webp'
import PageCount from '../Pagination/Pagination'
import { useNavigate } from 'react-router-dom';
import Global from '../../global/variables';
import Loader from '../utils/Loader';

const Home = () => {
  const [data, setData] = useState([])
  const [blog, setBlog] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [loader, setLoader] = useState(true)

  const navigate = useNavigate();
  const cookieValue = document.getElementById("cookies")

  useEffect( () => {
    get_blogs();
  }, [page])

  const get_blogs = async () => {
    setLoader(true)
    const data = {
      page: page
    }
    const response = await fetch(`${Global.proxy}/blog/get_blogs`, {
      method: 'POST',
      body: JSON.stringify(data)
})
    const jsonData = await response.json()
    setLoader(false)
    setData(jsonData)
    setBlog(jsonData?.resp[0])
    setPageCount(jsonData?.pageCount)

  }


  return(
  <>
    <NavBar />
    <div style={{marginLeft:'10%', marginRight:'10%', marginBottom:'10%'}}>
    <center>
    <div className="mt-5"> </div>
      <span className="blog-font" style={{fontSize:'1.5rem', color:'black'}}>The blog</span>
      <br />
      <b><span className="blog-font" style={{fontSize:'3rem'}}>Writings from our team</span></b>
      <br />
      <span className="blog-font" style={{color:'grey', fontSize:'1.5rem'}}>The latest industry news, interviews, technologies and resources.</span>
      <br />
      <br />
    </center>
    { loader ?
      <Loader />
       :
    <>
    { page == 1 ?
    <div className="container">
    <img src={`data:image/png;base64,${blog?.image}`} style={{maxHeight:'1000px',width:'100%', cursor:'pointer'}} onClick={() => { navigate(`/blog/${blog._id}`) }}/>
    <div class="bottom-left">
    <div onClick={() => { navigate(`/blog/${blog._id}`) }} style={{cursor:'pointer'}}>
      <div style={{fontSize:'2rem', float:'left', paddingLeft:10, paddingRight:10, width:'100%', wordWrap:'break-word'}}>{blog?.title?.substring(0,50)}{blog?.title?.length > 50 ? "..." : ""}</div>
      <br />
      <div style={{fontSize:'1.2rem', float:'left', paddingLeft:10, paddingRight:10, width:'100%'}}>{blog?.description?.substring(0, 150)}...</div>
      <br />
      <br />
      </div>
      <div style={{paddingLeft:10, paddingRight:10, marginTop:'3rem'}}>
      {
        blog?.tags?.map( (tag) => {
          return(
            <>
            <span onClick={() => { navigate(`/blogs/${tag}`) }} style={{border:'1px solid white', borderRadius:10, padding:5, cursor:'pointer'}}>{tag}</span> &nbsp; &nbsp;
            </>
          )
        })
      }
      </div>
    </div>
    </div> : ""
  }
    <div className="container">
      <BlogCard data = {page == 1 ? {...data, resp:data?.resp?.slice(1,8)} : data}/>
      <div className="mb-4"> </div>
      <center>
      <PageCount page={page} setPage = {setPage} pageCount = {pageCount}/>
      </center>
    </div>
    </>
    }
    </div>
  </>
  );
}

export default Home;
