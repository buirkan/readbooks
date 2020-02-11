import React, { Fragment } from 'react'

const BookItem = React.lazy(() => import('./BookItem'))

export default (props) => {
    const books = props.mainList
        ? (props.booksList || [])
        : (props.favoritesList || [])
    const favorites = props.favoritesList

    const checkFavorite = (item) => {
        let matches = favorites.filter((favorite) => item.id === favorite.id)
        return matches === []
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