import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const FullPizza: React.FC = () => {
  const [item, setItem] = useState<{
    title: string
    price: number
    imageUrl: string
  }>()
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
    return <>⏳ Завантаження..</>
  }

  return (
    <div className="container">
      <img src={item.imageUrl} alt="pizza" width="100px" />
      <h2>{item.title}</h2>
      <b>{item.price} UAH.</b>
    </div>
  )
}

export default FullPizza
