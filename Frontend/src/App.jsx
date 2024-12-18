
import { Route, Routes } from 'react-router-dom'
import AuthForm from './Pages/AuthForm'
import NavBar from './Components/NavBar'
import Home from './Components/Home'

function App() {

  return (

    <div className='  w-full min-h-screen '>
         <Routes>
      <Route path= "/" element={<NavBar/>}>
        <Route path= "/" element={<Home/>}/>
     <Route path='/signup' element={<AuthForm type={"signup"}/>}/>
     <Route path='/login' element={<AuthForm type={"login"}/>}/>
      </Route>
    

    </Routes>
    </div>
 
  )
}

export default App