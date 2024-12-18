import { Outlet } from "react-router-dom"


function NavBar() {
  return (

    <>
    <div className="bg-slate-500 w-full h-14 ">Blog App</div>
    <Outlet />
    </>
  )
}

export default NavBar