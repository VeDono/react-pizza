import React, { useCallback, useRef, useState } from 'react'
import { setSearchValue } from '../../redux/slices/filterSlice'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import SearchIcon from './SearchIcon'
import ClearIcon from './ClearIcon'
import styles from './Search.module.scss'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef()

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 250),
    []
  )

  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    // document.querySelector('input').focus() //Так делать не стоит, не желательно правилами
    inputRef.current.focus()
  }

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <SearchIcon />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && <ClearIcon onClickClear={onClickClear} />}
    </div>
  )
}

export default Search
