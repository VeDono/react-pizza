import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import ButtonBack from '../components/ButtonBack'

const FullPizza = () => {
  const [pizza, setPizza] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6437e97ec1565cdd4d6122a5.mockapi.io/items/${id}`
        )
        setPizza(data)
      } catch (error) {
        console.error(error)
        alert('Произошла ошибка при получении данных 😞')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return (
      <div className="container">
        <div className="pizza-loadingPage">
          <h2>Загрузка...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="pizza-block">
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizza.price} ₴</div>
        </div>
      </div>
      <ButtonBack />
    </div>
  )
}

export default FullPizza
