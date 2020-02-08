import React from 'react'
import BookThumbnail from './BookThumbnail'

export default (props) => {
    const showHideClass = props.display ? 'modal display-block' : 'modal display-none'

    console.log(props.thumbnail)
    
    return (
        <div className={showHideClass} onClick={props.handleClose}>
            <button className='closeButton' onClick={props.handleClose}>
                <i className='fa fa-close'></i>
            </button>
            <section className="main-card">
                <h3>{props.title}</h3>
                <BookThumbnail thumbnail={props.thumbnail} alt='Book thumbnail' />
            </section>
        </div>
    )
}