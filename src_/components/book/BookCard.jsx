import React, { Fragment, Suspense } from 'react'
import { ShowCondition } from '../Utils'
import Spinner from '../template/loader/Spinner'

const BookThumbnail = React.lazy(() => import('./BookThumbnail'))

export default (props) => {
    const book = props.book

    const HeaderCard = () => (
        <Fragment>
            <h1 className='titleCard'>{book.title}</h1>
            <ShowCondition condition={book.subtitle}>
                <sub className='subtitle'>{book.subtitle}</sub>
            </ShowCondition>
            <hr id='divisor' className='my-4'></hr>
        </Fragment>
    )

    const BookDescription = () => (
        <div className='descriptionArea'>
            <sub className="subtitle">Descrição</sub>
            <hr id="divisor" className="card-divisor my-4" />
            <p className='description'>{book.synopsis}</p>
        </div>
    )

    const BookAuthors = () => (
        <div>
            <sub className='subtitle'>Autores</sub>
            <hr id='divisor' className='card-divisor my-4' />
            {book.authors.map(author => (
                <p key={author} className='description'>{author}</p>
            ))}
        </div>
    )

    const Publisher = () => (
        <div>
            <sub className='subtitle'>Editora</sub>
            <hr id='divisor' className='card-divisor my-4' />
            <p className='description'>{book.publisher}</p>
        </div>
    )

    const BookRelease = () => (
        <div>
            <sub className='subtitle'>Lançamento</sub>
            <hr id='divisor' className='card-divisor my-4' />
            <p className='description'>{book.releaseDate}</p>
        </div>
    )

    const PageCount = () => (
        <div>
            <sub className='subtitle'>Quantidade de Páginas</sub>
            <hr id='divisor' className='card-divisor my-4' />
            <p className='description'>{book.pageCount}</p>
        </div>
    )

    const BookCategories = () => (
        <div>
            <sub className='subtitle'>Categoria(s)</sub>
            <hr id='divisor' className='card-divisor my-4' />
            {book.categories.map(category => (
                <p key={category} className='description'>{category}</p>
            ))}
        </div>
    )

    const BookLanguage = () => (
        <div>
            <sub className='subtitle'>Idioma</sub>
            <hr id='divisor' className='card-divisor my-4' />
            <p className='description'>{book.language}</p>
        </div>
    )

    const BookPreview = () => (
        <div>
            <sub className='subtitle'>Prévia do Livro</sub>
            <hr id='divisor' className='card-divisor my-4' />
            <a className='description'>{book.preview}</a>
        </div>
    )

    const BookInfo = () => (
        <div>
            <sub className='subtitle'>Informações do Livro</sub>
            <hr id='divisor' className='card-divisor my-4' />
            <a className='description'>{book.info}</a>
        </div>
    )

    return (
        <Fragment>
            <div className='modal display-block'>
                <button className='closeButton' onClick={props.handleClose}>
                    <i className='fa fa-close'></i>
                </button>
                <section className="modal-main main-card">
                    <div className="headerCard">
                        <HeaderCard />
                    </div>
                    <div className='thumbnailArea col-sm-4'>
                        <Suspense fallback={<Spinner />}>
                            <BookThumbnail volumeInfo={book.volumeInfo} thumbnail={book.thumbnail} alt='Book thumbnail' />
                        </Suspense>
                    </div>
                    <div className='col-sm-8 synopsisBox'>
                        <ShowCondition condition={book.synopsis}>
                            <BookDescription />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-6 col-xs-6'>
                        <ShowCondition condition={book.authors}>
                            <BookAuthors />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-6 col-xs-6'>
                        <ShowCondition condition={book.publisher}>
                            <Publisher />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-6 col-xs-6'>
                        <ShowCondition condition={book.releaseDate}>
                            <BookRelease />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-6 col-xs-6'>
                        <ShowCondition condition={book.pageCount}>
                            <PageCount />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-6 col-xs-6'>
                        <ShowCondition condition={book.categories}>
                            <BookCategories />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-6 col-xs-6'>
                        <ShowCondition condition={book.language}>
                            <BookLanguage />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-12 col-xs-12'>
                        <ShowCondition condition={book.preview}>
                            <BookPreview />
                        </ShowCondition>
                    </div>
                    <div className='col-sm-12 col-xs-12'>
                        <ShowCondition condition={book.info}>
                            <BookInfo />
                        </ShowCondition>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}