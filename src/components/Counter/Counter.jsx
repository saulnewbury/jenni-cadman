import React from 'react'
import './counter.scss'

const Counter = ({ id, length }) => {
  return (
    <p>
      {id + 1}/{length}
    </p>
  )
}

export default Counter
