import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        blanditiis deleniti deserunt dolores doloribus eaque eum explicabo
        laborum laudantium libero nihil obcaecati pariatur quia quidem quo
        recusandae, ullam ut veritatis.
      </p>
    </div>
  )
}

export default NotFoundBlock
