import React, {useState, useEffect} from 'react';
import BlogCard from "../Card/Card"
import NavBar from '../Navbar/Navbar'
import './home.css'
import blog1 from '../../images/image2.webp'
import PageCount from '../Pagination/Pagination'
import { useNavigate } from 'react-router-dom';
import Global from '../../global/variables';

const Home = () => {
  const [data, setData] = useState([])
  const [blog, setBlog] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [loader, setLoader] = useState(true)
  // console.log(process.ENV.NODE_ENV)
  console.log(process.env.NODE_ENV)

  const navigate = useNavigate();

  useEffect( () => {
    get_blogs();
  }, [])

  const get_blogs = async () => {
    const data = {
      page: page
    }
    const response = await fetch(`${Global.proxy}/blog/get_blogs`, {
      method: 'POST',
      body: JSON.stringify(data)
})
    // console.log(response)
    const jsonData = await response.json()
    // console.log(jsonData)
    setData(jsonData)
    setBlog(jsonData?.resp[0])
    // console.log(jsonData?.resp[0])
    setPageCount(jsonData?.pageCount)
    setLoader(false)

  }

  useEffect(() => {
    setLoader(true)
    get_blogs()
  },[page])

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
      <div className="d-flex justify-content-center" style={{marginTop:'10%'}}>
      <div className="spinner-grow" style={{width: '3rem', height: '3rem', role:"status"}}>
        <span className="sr-only"></span>
      </div>
       </div>
       :
    <>
    { page == 1 ?
    <div className="container">
    <img src={`data:image/png;base64,${blog?.image}`} style={{maxHeight:'1000px',width:'100%'}}/>
    <div class="bottom-left">
    <div onClick={() => { navigate(`/blog/${blog._id}`) }} style={{cursor:'pointer'}}>
      <div style={{fontSize:'2rem', float:'left', paddingLeft:10, paddingRight:10, width:'100%'}}>{blog?.title?.substring(0,50)}{blog?.title?.length > 50 ? "..." : ""}</div>
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
