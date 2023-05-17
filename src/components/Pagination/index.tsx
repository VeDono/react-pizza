import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import {
  setCurrentPage,
  selectCurrentPage,
} from '../../redux/slices/filterSlice'

import styles from './Pagination.module.scss'

const Pagination: React.FC = () => {
  const dispatch = useDispatch()
  const currentPage: number = useSelector(selectCurrentPage)

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
