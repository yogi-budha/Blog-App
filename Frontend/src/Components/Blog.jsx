import axios from 'axios'
import  { useEffect, useState } from 'react'



function Blog() {
  
  const [allBlogsData,setallBlogsData] = useState([])

const allBlogs = async ()=>{
 await axios.get("http://localhost:3000/api/v1/blog").then((res)=>{

   setallBlogsData(res.data.blog)
  })
}

useEffect(()=>{
  allBlogs()
},[])
  return (
    <div>
      {allBlogsData.map((data)=>(
        <div key={data._id}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
        
      ))}
    </div>
  )
}

export default Blog