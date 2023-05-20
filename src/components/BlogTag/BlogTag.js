import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import './BlogTag.css'
import BlogCard from '../Card/Card'
import NavBar from '../Navbar/Navbar';
import PageCount from '../Pagination/Pagination';


const BlogsTag = () => {
  const [data, setData] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  const { tag } = useParams();
  console.log(tag)

  useEffect( () => {
    fetchBlogs();
  }, [tag, page])

  const fetchBlogs = async() => {
    const data = {
      tag: tag,
      page: page
    }
    const response = await fetch('http://localhost:8000/blog/blogs_tag', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const resp = await response.json()
    setData(resp)
    setPageCount(resp.pageCount)
    console.log(resp)
  }

return(
  <>
  <NavBar />
  <div style={{marginLeft:'10%', marginRight:'10%', marginBottom:'10%', marginTop:'3%'}}>
    <center>
      <span className="blog-font" style={{fontSize:"3rem"}}> {tag} </span>
      <BlogCard data={data} />
    </center>
  </div>
  <PageCount page={page} setPage = {setPage} pageCount = {pageCount} />
  <div style={{marginBottom:100}}>
  </div>
  </>
)
}

export default BlogsTag;
