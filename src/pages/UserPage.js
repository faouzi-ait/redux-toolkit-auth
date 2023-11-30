import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserPage = () => {
  const data = useSelector(state => state);

  console.log(data);

  return (
    <div>
      <div>LOGGED IN USER PAGE</div>
      <div><Link to='/memos'>Go to memo page</Link></div>
    </div>
  )
}

export default UserPage