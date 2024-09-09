import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import "./ProfileUser.css"
const Profile = () => {
  const {user} = useContext(AppContext);

  return (
    <>
        <div className="container profile center my-5">
            <h1>Welcome @{user?.name}</h1> 
            <h3>Email: {user?.email}</h3>
        </div>
    </>
  )
}

export default Profile