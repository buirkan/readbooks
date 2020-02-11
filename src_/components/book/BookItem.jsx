import React, { Fragment, Component, Suspense } from 'react'
import CustomButton from '../template/CustomButton'
import BookCard from './BookCard'
import Spinner from '../template/loader/Spinner'
import { ShowCondition } from '../Utils'

class BookItem extends Component {
    constructor(props) {
        super(props)
        this.state = { showCard: false }

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
            isFavorite: false
        }

        this.handleMardAsFav = this.handleMarkAsFav.bind(this)
        this.handleShowCard = this.handleShowCard.bind(this)
        this.handleHideCard = this.handleHideCard.bind(this)
        this.CardContent = this.CardContent.bind(this)
    }

    handleMarkAsFav(e) {
        console.log(e.target)
    }

    handleShowCard(e) {
        if (this.state.showCard == true) {
            console.log('card display is already true')
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

    render() {
        return (
            <div>
                <div className='movie' onClick={this.handleShowCard} >
                    <h4>{this.book.title}</h4>
                    <ShowCondition condition={this.state.showCard}>
                        <Suspense fallback={<Spinner />}>
                            <BookCard book={this.book} handleClose={this.handleHideCard} />
                        </Suspense>
                    </ShowCondition>
                </div>
                <CustomButton
                    show={true}
                    showText={false}
                    category='warning'
                    icon='star'
                    callback={this.handleMarkAsFav} />
            </div>
        )
    }
}

export default BookItem