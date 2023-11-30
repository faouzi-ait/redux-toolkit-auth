import React from 'react'
import { useSelector } from 'react-redux'

import { useGetMemosQuery } from '../redux/apiServices/apiMemo'

const Memos = () => {
  const { data } = useGetMemosQuery();

  console.log(data);

  return (
    <div>MEMO PAGE</div>
  )
}

export default Memos