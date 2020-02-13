import React, { Fragment, Component, Suspense } from 'react'
import CustomButton from '../template/CustomButton'
import BookCard from './BookCard'
import Spinner from '../template/loader/Spinner'
import { ShowCondition } from '../Utils'

const BookThumbnail = React.lazy(() => import('./BookThumbnail'))
class BookItem extends Component {
    constructor(props) {
        super(props)
        this.state = { showCard: false, isFavorite: false }

        this.book = {
            title: props.book.volumeInfo.title || '',
            subtitle: props.book.volumeInfo.subtitle || '',
            volumeInfo: props.book.volumeInfo,
            authors: props.book.volumeInfo.authors || '',
            publisher: props.book.volumeInfo.publisher || '',
            releaseDate: props.book.volumeInfo.publishedDate || '',
            synopsis: props.book.volumeInfo.description || '',
            pageCount: props.book.volumeInfo.pageCount || '',
            categories: props.book.volumeInfo.categories || '',
            language: props.book.volumeInfo.language || '',
            preview: props.book.volumeInfo.previewLink || '',
            info: props.book.volumeInfo.infoLink || '',
        }

        this.handleShowCard = this.handleShowCard.bind(this)
        this.handleHideCard = this.handleHideCard.bind(this)
        this.CardContent = this.CardContent.bind(this)
        this.setBookAsFavorite = this.setBookAsFavorite.bind(this)
    }

    componentDidMount() {
        if (this.props.isAlreadyFavorite) {
            this.setState({ isFavorite: true })
        }
    }

    handleShowCard(e) {
        if (this.state.showCard == true) {
            e.preventDefault()
            return
        }
        this.setState({ showCard: true })
    }

    handleHideCard() {
        this.setState({ showCard: false })
    }

    CardContent() {
        return (
            <Suspense fallback={<Spinner />}>
                <BookCard book={this.book} handleClose={this.handleHideCard} />
            </Suspense>
        )
    }

    setBookAsFavorite(book) {
        if (!this.state.isFavorite) {
            console.log('setting book as favorite...')
            this.setState({ isFavorite: true })
            this.props.markFavorite(book)
        } else {
            console.log('removing book from favorites...')
            this.setState({ isFavorite: false })
            this.props.removeFavorite(book)
        }
    }

    render() {
        return (
            <Fragment>
                <div className='bookItem' onClick={this.handleShowCard} >
                    <div className="main-thumb-poster">
                        <Suspense fallback={<Spinner />}>
                            <BookThumbnail classAttribute='poster-list' volumeInfo={this.book.volumeInfo} thumbnail={this.book.thumbnail} alt='Book thumbnail' />
                            <div className='overlay'>
                                <div>{this.book.title}</div>
                            </div>
                        </Suspense>
                    </div>
                </div>
                <ShowCondition condition={this.state.showCard}>
                    <Suspense fallback={<Spinner />}>
                        <BookCard book={this.book} handleClose={this.handleHideCard} />
                    </Suspense>
                </ShowCondition>
                <div className='favorite'>
                    <CustomButton
                        idButton='fav-button'
                        favState={this.state.isFavorite ? 'favoriteOn' : 'favoriteOff'}
                        show={true}
                        showText={false}
                        category={this.state.isFavorite ? 'secondary' : 'warning'}
                        icon='star'
                        callback={() => this.setBookAsFavorite(this.book)}
                    />
                </div>
            </Fragment>
        )
    }
}

export default BookItem