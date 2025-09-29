import { useDispatch, useSelector } from 'react-redux'
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice.js'
import React from 'react'

const categories = [
  'Усі',
  "М'ясні",
  'Вегетаріанські',
  'Гриль',
  'Гострі',
  'Закриті',
]

const Categories: React.FC = () => {
  const dispatch = useDispatch()
  const { categoryId } = useSelector(selectFilter)
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
