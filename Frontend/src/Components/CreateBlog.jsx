import axios from 'axios';
import  { useState } from 'react'

import {Navigate} from "react-router-dom"

function CreateBlog() {

  const token = localStorage.getItem("token")

  const [blogData, setblogData] = useState({
   
    title: "",
    description: "",
  });



  const onchangeHandler = (e) => {
    setblogData(() => ({ ...blogData, [e.target.name]: e.target.value }));
  };

  const onClickHandler = async(e) => {

    e.preventDefault()

    await axios.post('http://localhost:3000/api/v1/blog',blogData,{
      headers:{
        "Authorization":"Bearer "+token,
        'Content-Type':'application/json'
      }
    }).then((res)=>{

      
      alert(res.data.message)
      
    }).catch((error)=>{

      alert(error.response.data.message)
      

    })

    
  };

  if(!token){
    return <Navigate to="/signup" replace={true} />
  }
  return (

    
    <div className="flex items-center justify-center ">
      <div className=" mt-10">
        <h1 className="text-slate-200 text-2xl m-4 items-center">
          Create an Account
        </h1>

        <form>
          <input
            className="bg-slate-500 border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg py-1"
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => onchangeHandler(e)}
          />
          <input
            className="bg-slate-500 border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg py-1"
            type="email"
            name="description"
            placeholder="description"
            onChange={(e) => onchangeHandler(e)}
          />
       
          <input
            type="submit"
            className="block mt-7 border border-blue-500 outline-none text-xl px-2 py-1 rounded-xl bg-blue-500 hover:bg-blue-400"
            value={"Submit"}
            onClick={(e)=>{onClickHandler(e)}}
          ></input>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog