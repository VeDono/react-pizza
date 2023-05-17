import React from 'react'
import styles from './NotFoundBlock.module.scss'

import ButtonBack from '../components/ButtonBack'

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.main}>
        <span className={styles.main__emoji}>😥</span>
        <h1>Ничего не найдено</h1>
        <ButtonBack />
      </div>
    </div>
  )
}

export default NotFound
