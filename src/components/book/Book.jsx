import React, { Component, Suspense } from 'react'
import axios from 'axios'
import BookForm from './BookForm'
import Spinner from '../template/loader/Spinner'
import config from '../../config/appconfig'
import { ShowCondition } from '../Utils'
import CustomButton from '../template/CustomButton'
import Pagination from '../pagination/Pagination'
import { containsObjectById } from '../Utils'

// lazy component
const BookList = React.lazy(() => import('./BookList'))
const TRIGGER_INTERVAL = 500

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            bookList: [],
            favoritesList: [],
            startIndex: 0,
            totalVolume: 0,
            totalFavorites: 0,
            booksPerPage: 18,
            showCard: false,
            mainListDisplay: true,
        }

        this.handleInput = this.handleInput.bind(this)
        this.checkQuery = this.checkQuery.bind(this)
        this.getBooksList = this.getBooksList.bind(this)
        this.triggerSearch = this.triggerSearch.bind(this)
        this.handleAddToFavorites = this.handleAddToFavorites.bind(this)
        this.handleRemoveFromFavorites = this.handleRemoveFromFavorites.bind(this)
        this.handleSearchBooks = this.handleSearchBooks.bind(this)
        this.handleSearchFavorites = this.handleSearchFavorites.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleKeyEvent = this.handleKeyEvent.bind(this)
    }

    componentDidMount() {
        this.timer = null
    }

    getBooksList(actualDescription) {
        const url = `${config.APIURL}?q=${this.checkQuery(actualDescription)}&maxResults=${this.state.booksPerPage}&orderBy=relevance&startIndex=${this.state.startIndex}`
        return axios.get(url)
    }

    checkQuery(text) {
        let letterNumberCheck = /.*\S.*/ig
        return text.match(letterNumberCheck) ? `${text.replace(/ /g, '+')}` : ''
    }

    triggerSearch() {
        if (this.checkQuery(this.state.input)) {
            return (
                this.getBooksList(this.state.input)
                    .then(resp => {
                        this.setState({
                            bookList: resp.data.items,
                            totalVolume: resp.data.totalItems
                        })
                    })
                    .catch(err => console.error(err))
            )
        }
    }

    handleKeyEvent(evt) {
        if (evt.key === 'Backspace' || evt.key === 'Backspace' && evt.key === 'Control') {
            if (evt.target.value === '')
                this.setState({ bookList: [] })
        }
    }

    handleInput(e) {
        if (this.timer)
            clearTimeout(this.timer)

        this.setState({ input: e.target.value })
        this.timer = setTimeout(this.triggerSearch, TRIGGER_INTERVAL)
    }

    setNewFavorite(listFavorites, bookData) {
        listFavorites = this.state.favoritesList.concat(bookData)
        this.setState({ favoritesList: listFavorites, totalFavorites: listFavorites.length })
    }

    handleAddToFavorites(book) {
        var favorites

        if (this.state.favoritesList.length > 0) {
            favorites = this.state.favoritesList
            let indexOnFavorites = containsObjectById(book, favorites)

            // prevent duplicate items
            if (indexOnFavorites == -1)
                this.setNewFavorite(favorites, book)
            else
                console.log('livro já se encontra nos favoritos!')
        } else {
            this.setNewFavorite(favorites, book)
        }
    }

    handleRemoveFromFavorites(book) {
        const favorites = this.state.favoritesList
        const bookIndex = containsObjectById(book, favorites)

        if (bookIndex != -1)
            favorites.splice(bookIndex, 1)
        else
            console.log('livro não encontrado!')

        this.setState({ favoritesList: favorites, totalFavorites: favorites.length })
    }

    handleSearchBooks() {
        this.setState({ mainListDisplay: true })
    }

    handleSearchFavorites() {
        this.setState({ mainListDisplay: false })
    }

    handleChangePage(pageIndex) {
        this.setState({ startIndex: pageIndex }, this.triggerSearch)
    }

    render() {
        return (
            <main className='container-fluid col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2'>
                <h1 id='appTitle'>Read Books <span>&#128218;</span></h1>
                <div className='buttonsHeader'>
                    <CustomButton
                        idButton='searchButton'
                        show={true}
                        showText={true}
                        text='Pesquisar'
                        category='light'
                        icon='search'
                        callback={this.handleSearchBooks} />

                    <CustomButton
                        idButton='favoritesButton'
                        show={true}
                        showText={true}
                        text='Favoritos'
                        category='warning'
                        icon='star'
                        callback={this.handleSearchFavorites} />
                </div>
                <hr id='divisor' className='my-4'></hr>
                <BookForm
                    input={this.state.input} handleUp={this.handleKeyEvent}
                    handleInputValue={this.handleInput} />
                <ShowCondition condition={this.state.bookList.length > 0 || this.state.favoritesList.length > 0}>
                    <Suspense fallback={<Spinner />}>
                        <BookList
                            mainList={this.state.mainListDisplay}
                            booksList={this.state.bookList}
                            favoritesList={this.state.favoritesList}
                            handleShowCard={this.handleShowCard}
                            markFavorite={(book) => this.handleAddToFavorites(book)}
                            removeFavorite={(book) => this.handleRemoveFromFavorites(book)} />
                        <div className='text-center'>
                            <Pagination
                                items={this.state.mainListDisplay ? this.state.totalVolume : this.state.totalFavorites}
                                itemsPerPage={this.state.booksPerPage}
                                handleChangePage={this.handleChangePage} />
                        </div>
                    </Suspense>
                </ShowCondition>
            </main>
        )
    }
}

export default Book