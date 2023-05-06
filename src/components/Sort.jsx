import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSort } from '../redux/slices/filterSlice'
import { useEffect } from 'react'

import { selectSort } from '../redux/slices/filterSlice'

export const listItems = [
  {
    name: 'популярности ☝',
    sortProperty: 'rating',
    order: 'asc',
    sortType: 'rating-asc',
  },
  {
    name: 'популярности 👇',
    sortProperty: 'rating',
    order: 'desc',
    sortType: 'rating-desc',
  },
  {
    name: 'цене ☝',
    sortProperty: 'price',
    order: 'asc',
    sortType: 'price-asc',
  },
  {
    name: 'цене 👇',
    sortProperty: 'price',
    order: 'desc',
    sortType: 'price-desc',
  },
  {
    name: 'алфавиту',
    sortProperty: 'title',
    order: 'desc',
  },
]

function Sort() {
  // const [isActive, setIsActive] = useState(0)
  const [isOpened, setIsOpened] = useState(false)
  const selectedSort = useSelector(selectSort)
  const dispatch = useDispatch()
  const sortRef = useRef()

  // Закрытие pop-up по нажатию на область вне sort
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsOpened(false)
      }
    }

    document.body.addEventListener('click', handleOutsideClick)

    return () => document.body.removeEventListener('click', handleOutsideClick)
  }, [])

  return (
    <>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setIsOpened(!isOpened)}>
            {selectedSort.name}
          </span>
        </div>
        {isOpened === true && (
          <>
            <div className="sort__popup">
              <ul>
                {listItems.map((obj, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      dispatch(setSelectedSort(obj))
                      setIsOpened(!isOpened)
                    }}
                    className={
                      selectedSort.sortType === obj.sortType ? 'active' : ''
                    }
                  >
                    {obj.name}
                  </li>
                ))}
                {/* <li className="active">популярности</li>
                <li>цене</li>
                <li>алфавиту</li> */}
              </ul>
            </div>
          </>
        )}
      </div>
      {/* {isOpened == true && (
        <div onClick={() => setIsOpened(!isOpened)} className="sortBg"></div>
      )} */}
    </>
  )
}

export default Sort
