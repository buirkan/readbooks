import React, { Fragment } from 'react'
import { containsObjectById } from '../Utils'

const BookItem = React.lazy(() => import('./BookItem'))

const BookList = (props) => {
    const books = props.mainList
        ? (props.booksList || [])
        : (props.favoritesList || [])
    const favorites = props.favoritesList || []

    const checkFavorite = (bookItem) => {
        var isFavorite = -1

        if (favorites.length > 1)
            isFavorite = containsObjectById(bookItem, favorites)

        return isFavorite != -1 ? true : false
    }

    const renderBooks = () => {
        return books.map(book => (
            <div className='book-content col-6 col-md-4 col-sm-4 col-xs-6' key={book.id}>
                <li key={book.id}>
                    <BookItem
                        book={book}
                        isAlreadyFavorite={checkFavorite(book)}
                        markFavorite={() => props.markFavorite(book)}
                        removeFavorite={() => props.removeFavorite(book)} />
                </li>
            </div>
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

export default BookList