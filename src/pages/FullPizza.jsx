import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PizzaBlock from '../components/PizzaBlock/index.jsx'

const FullPizza = () => {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/items/' + id)
        setItem(data)
      } catch (error) {
        console.error('❌ Помилка при запиті піци:', error)
        alert('❌ Помилка при запиті піци')
        navigate('/')
      }
    }

    getData()
  }, [id])

  if (!item) {
    return <h2>⏳ Завантаження...</h2>
  }

  return (
    <div className="container">
      <PizzaBlock {...item} />
    </div>
  )
}

export default FullPizza
