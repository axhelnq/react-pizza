import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type IPaginationProps = {
  currentPage: number
  // todo any
  onChangePage: any
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // захардкожено, бо json-server не вміє повертати к-сть сторінок
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
