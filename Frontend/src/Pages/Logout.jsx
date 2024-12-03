import React from 'react'

function Logout() {
  return (
    <div onClick={localStorage.removeItem("token")}>Logout</div>
  )
}

export default Logout