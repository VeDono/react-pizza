import React from 'react'
import { Link } from 'react-router-dom'

const ButtonBack: React.FC = () => {
  return (
    <Link to="/">
      <button className="button button--black">Вернуться назад</button>
    </Link>
  )
}

export default ButtonBack
