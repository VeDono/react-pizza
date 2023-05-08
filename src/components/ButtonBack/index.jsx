import React from 'react'
import { Link } from 'react-router-dom'

const ButtonBack = () => {
  return (
    <Link to="/">
      <a className="button button--black">Вернуться назад</a>
    </Link>
  )
}

export default ButtonBack
