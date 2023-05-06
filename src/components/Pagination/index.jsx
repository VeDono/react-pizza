import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import {
  setCurrentPage,
  selectCurrentPage,
} from '../../redux/slices/filterSlice'

import styles from './Pagination.module.scss'

const Pagination = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)
  return (
    // <ul className={styles.root}>
    //   <li className="previous disabled">
    //     <a
    //       className=" "
    //       tabindex="-1"
    //       role="button"
    //       aria-disabled="true"
    //       aria-label="Previous page"
    //       rel="prev"
    //     >
    //       &lt;
    //     </a>
    //   </li>
    //   <li className="selected">
    //     <a
    //       rel="canonical"
    //       role="button"
    //       tabindex="-1"
    //       aria-label="Page 1 is your current page"
    //       aria-current="page"
    //     >
    //       1
    //     </a>
    //   </li>
    //   <li>
    //     <a rel="next" role="button" tabindex="0" aria-label="Page 2">
    //       2
    //     </a>
    //   </li>
    //   <li>
    //     <a role="button" tabindex="0" aria-label="Page 3">
    //       3
    //     </a>
    //   </li>
    //   <li className="next">
    //     <a
    //       className=""
    //       tabindex="0"
    //       role="button"
    //       aria-disabled="false"
    //       aria-label="Next page"
    //       rel="next"
    //     >
    //       &gt;
    //     </a>
    //   </li>
    // </ul>

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
