import React, { useState, Suspense } from 'react'
import CustomButton from '../template/CustomButton'
import BookCard from './BookCard'
import Spinner from '../template/loader/Spinner'

export default props => {
    const handleMarkAsFav = (e) => { }
    const [showCard, changeDisplay] = useState(false)

    const checkTumbnailSource = () => {
        const hasThumbnail = props.book.volumeInfo.hasOwnProperty('imageLinks')
            ? props.book.volumeInfo.imageLinks.thumbnail
            : false
        return hasThumbnail
    }

    return (
        <div className='movie' onClick={() => changeDisplay(true)}>
            <h4>{props.book.volumeInfo.title}</h4>
            <CustomButton
                show={true}
                showText={false}
                category='warning'
                icon='star'
                callback={handleMarkAsFav} />
            <Suspense fallback={<Spinner />}>
                <BookCard
                    display={showCard}
                    title={props.book.volumeInfo.title}
                    thumbnail={checkTumbnailSource()}
                    handleClose={() => changeDisplay(false)} />
            </Suspense>
        </div>
    )
}