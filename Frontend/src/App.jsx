
import { Route, Routes } from 'react-router-dom'
import CreateBlog from './Components/CreateBlog'
import SignIn from './Pages/signIn'
import SignUp from './Pages/SignUp'
import Blog from './Components/Blog'

function App() {
  return (

    <div className='bg-slate-800 w-full h-screen'>
         <Routes>
      <Route path= "/" element={<Blog/>}/>
      <Route path= "/signup" element={<SignUp/>}/>
      <Route path= "/signin" element={<SignIn/>}/>
      <Route path= "/createBlog" element={<CreateBlog/>}/>
      <Route path= "*" element={<h1> NOT FOUND</h1>}/>

    </Routes>
    </div>
 
  )
}

export default App