import React from 'react'
import { useDispatch } from 'react-redux'

import { setCurrentPage } from '../redux/slices/filterSlice'

type CategoriesProps = {
  categoryId: number
  onChangeCategory: (index: number) => void
}

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    const dispatch = useDispatch()

    const onClickCategory = (index: number) => {
      onChangeCategory(index)
      dispatch(setCurrentPage(1))
    }

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? 'active' : ''}
              key={index}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default Categories
