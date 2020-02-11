import React, { Fragment } from 'react'
import BookItem from './BookItem'

export default (props) => {
    const renderBooks = () => {
        const books = props.booksList || []
        return books.map(book => (
            <li key={book.id}>
                <BookItem book={book} />
            </li>
        ))
    }

    return (
        <Fragment>
            <ul className='list-books list-group'>
                {renderBooks()}
            </ul>
        </Fragment>
    )
}