import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice.js'

const typesValues = ['тонке', 'традиційне']
// todo недо лишній маньовр, на беку є розміра добрі
const sizesValues = [26, 30, 40]

type IPizzaProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
  rating: number
}

const PizzaBlock: React.FC<IPizzaProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
  // todo rating не використовуэться ніде чогось
  rating,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const [activeTypeIndex, setActiveTypeIndex] = useState<number>(0)
  const [activeSizeIndex, setActiveSizeIndex] = useState<number>(0)

  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typesValues[activeTypeIndex],
      size: sizesValues[activeSizeIndex],
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                className={activeTypeIndex === typeId ? 'active' : ''}
                onClick={() => setActiveTypeIndex(typeId)}
              >
                {typesValues[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                className={activeSizeIndex === index ? 'active' : ''}
                onClick={() => setActiveSizeIndex(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">від {price} ₴</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавити</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
