import { useState } from "react";
import axios from 'axios'

function SignUp() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });



  const onchangeHandler = (e) => {
    setUserData(() => ({ ...userData, [e.target.name]: e.target.value }));
  };

  const onClickHandler = async(e) => {

    e.preventDefault()

    await axios.post('http://localhost:3000/api/v1/user',userData).then((res)=>{

      alert(res.data.message)

      localStorage.setItem("user",JSON.stringify(res.data.token))
    }).catch((error)=>{

      alert(error.response.data.message)

    })

    
  };


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
            name="userName"
            placeholder="userName"
            onChange={(e) => onchangeHandler(e)}
          />
          <input
            className="bg-slate-500 border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg py-1"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => onchangeHandler(e)}
          />
          <input
            className="bg-slate-500 border border-green-950 mx-1 outline-none text-xl px-2 rounded-lg  py-1"
            type="text"
            name="password"
            placeholder="password"
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
  );
}

export default SignUp;
