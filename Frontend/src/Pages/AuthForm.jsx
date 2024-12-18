import axios from 'axios';
import  { useState } from 'react'
import toast from 'react-hot-toast';

function AuthForm({type}) {
    const [userData, setUserData] = useState({
        name:"",
        email: "",
        password: "",
      });
    
      
    
    
      const onchangeHandler = (e) => {
        setUserData(() => ({ ...userData, [e.target.name]: e.target.value }));
      };
    
      const onClickHandler = async(e) => {
    
        e.preventDefault()
    
        await axios.post(`http://localhost:3000/api/v1/${type}`,userData).then((res)=>{
    
          
          localStorage.setItem("token",JSON.stringify(res.data.token))
          localStorage.setItem("user",JSON.stringify(res.data.user))

          
          toast.success(res.data.message)
        
    
    
        }).catch((error)=>{
    
          toast.error(error.response.data.message)
    
        })
    
        
      };
    
  
      return (
        <div className="flex items-center justify-center ">
          <div className=" mt-10">
            <h1 className="text-slate-200 text-2xl m-4 items-center">
            {type == "signup" ? "Sign Up": "Sign In"}
            </h1>
    
            <form>
             {type === "signup" ?   <input
                className=" border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg py-1 focus:outline-none"
                type="text"
                name="userName"
                placeholder="enter your name"
                onChange={(e) => onchangeHandler(e)}
              /> : ""}
             
              <input
                className=" border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg py-1"
                type="email"
                name="email"
                placeholder="enter your email"
                onChange={(e) => onchangeHandler(e)}
              />
              <input
                className=" border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg  py-1"
                type="text"
                name="password"
                placeholder="password"
                onChange={(e) => onchangeHandler(e)}
              />
    
              <input
                type="submit"
                className="block mt-7 border border-blue-500 outline-none text-xl px-2 py-1 rounded-xl bg-blue-500 hover:bg-blue-400"
                value={type == "signup" ? "Create an Account":"Login"}
                onClick={(e)=>{onClickHandler(e)}}
              ></input>
            </form>
          </div>
        </div>
      );
}

export default AuthForm