import axios from "axios"
import { useEffect, useState } from "react"


const Home = () => {

    const [Blogs,setBlogs] = useState([])

const fetchBlogsData = async () => {
    try {
        await axios.get("http://localhost:3000/api/v1/blog").then((res)=>{
            setBlogs(res.data.blog)
        })
    } catch (error) {
        console.log(error)
        
    }
   
}

useEffect(()=>{
    fetchBlogsData()
},[])
  return (
    <div className="w-full my-12 ">
        <div className="w-[60%] mx-auto flex flex-col gap-11 ">
           {
            Blogs.map((blog)=>(
                <div className="w-full" key={blog._id}>
                  <div className=" w-full flex justify-between items-center ">
                <div className=" w-[60%] flex gap-3 flex-col ">
                <div className=" flex gap-2 ">
                    <img className="w-[27px] rounded-md" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*btFFanfGX3eazQ6w5LOp0A.jpeg" alt="" />
                    <p >Yogesh Budha</p>
                </div>
                <div>
                    <p className="text-3xl font-bold">This is title</p>
                    <p className="line-clamp-2 text-slate-600">Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam doloremque quidem exercitationem alias optio nihil, placeat itaque debitis repellat rem ab voluptatum. Ratione fugit modi cumque dolorem maiores officia reprehenderit iusto ipsa ab consequatur!</p>
                </div>
                <div className="flex gap-3 items-center"> 
                    <p>12 dec,2024</p>
                    <p>500</p>
                    <p>200</p>
                </div>
            </div>
            <div className="w-[30%] flex justify-end ">
                <img className="w-[60%] rounded-md" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*btFFanfGX3eazQ6w5LOp0A.jpeg" alt="" />
            </div>

            
            </div>
           <hr className="mt-4"/>
                </div>
              
            ))
           }
        
            
        </div>
    </div>
  )
}

export default Home