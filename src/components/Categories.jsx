import React from 'react'
import { useDispatch } from 'react-redux'

import { setCurrentPage } from '../redux/slices/filterSlice'

const Categories = ({ categoryId, onChangeCategory }) => {
  // const [activeCategory, setActiveCategory] = useState(0)
  const dispatch = useDispatch()
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  const onClickCategory = (index) => {
    onChangeCategory(index)
    dispatch(setCurrentPage(1))
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={categoryId == index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
