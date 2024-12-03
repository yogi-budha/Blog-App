
import { Route, Routes } from 'react-router-dom'
import CreateBlog from './Components/CreateBlog'
import SignIn from './Pages/signIn'
import SignUp from './Pages/SignUp'
import Blog from './Components/Blog'
import Logout from './Pages/Logout'

function App() {

  const token = localStorage.getItem("token")
  return (

    <div className='bg-slate-800 w-full min-h-screen'>
         <Routes>
      <Route path= "/" element={<Blog/>}/>
      <Route path= "/signup" element={<SignUp token={token}/>}/>
      <Route path= "/signin" element={<SignIn token={token}/>}/>
      <Route path= "/createBlog" element={<CreateBlog/>}/>
      <Route path= "/logout" element={<Logout/>}/>
      <Route path= "*" element={<h1> NOT FOUND</h1>}/>

    </Routes>
    </div>
 
  )
}

export default App