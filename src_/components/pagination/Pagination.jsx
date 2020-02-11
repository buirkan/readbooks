import React, { Component } from 'react'

export default class Pagination extends Component {
  constructor(props) {
    super(props)

    this.initialPage = 1
    this.state = { paginator: {} }
  }

  componentDidMount() {
    if (this.props.items) {
      this.setPage(this.initialPage)
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.items !== prevProps.items) {
  //     this.setPage(this.initialPage)
  //   }
  // }

  setPage(page) {
    let itemsLength = this.props.items
    let pager = this.state.paginator

    if (page < 1 || page > pager.totalPages)
      return

    pager = this.getPager(itemsLength, page)
    // console.log(pager)

    this.setState({ paginator: pager })
    this.props.handleChangePage(pager.startIndex)
  }

  getPager(totalItems, currPage, itemsOnPage) {
    itemsOnPage = itemsOnPage || this.props.itemsPerPage

    let totalPages = Math.ceil(totalItems / itemsOnPage)
    let startPage, endPage
    let startIndex, endIndex, pages

    if (totalPages <= 10) {
      startPage = 1
      endPage = totalPages
    } else {
      if (currPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currPage - 5
        endPage = currPage + 4
      }
    }

    // index to request API startIndex
    startIndex = (currPage - 1) * itemsOnPage

    endIndex = Math.min(startIndex + itemsOnPage - 1, totalItems - 1)
    pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i)

    return {
      totalItems: totalItems,
      currentPage: currPage,
      pageSize: itemsOnPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    let pager = this.state.paginator

    if (!pager.pages || pager.pages.length <= 1)
      return null

    return (
      <ul className='pagination'>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    )
  }
}