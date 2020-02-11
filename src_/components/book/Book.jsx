import React, { Component, Suspense } from 'react'
import axios from 'axios'
import BookForm from './BookForm'
import Spinner from '../template/loader/Spinner'
import config from '../../config/appconfig'
import { ShowCondition } from '../Utils'
import CustomButton from '../template/CustomButton'
import Pagination from '../pagination/Pagination'

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
            booksPerPage: 10,
            showCard: false,
            mainListDisplay: true,
        }

        this.handleInput = this.handleInput.bind(this)
        this.formatQuery = this.checkQuery.bind(this)
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
        let letterNumberCheck = /^[0-9a-zA-Z\s]+$/i
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

    handleAddToFavorites(book) {
        console.log(`book: ${book}`)
        let favBooks = this.state.favoritesList

        favBooks.push(book)
        this.setState({ favoritesList: favbooks, totalFavorites: favBooks.length })
        //set true specific book as favorite
    }

    handleRemoveFromFavorites(book) {
        let favBooks = this.state.favoritesList
        const index = favBooks.indexOf(book)

        if (index > -1)
            favbooks.splice(index, 1)

        this.setState({ favoritesList: favbooks, totalFavorites: favbooks.length })
        // set false specific book as favorite
    }

    handleSearchBooks() {
        if (this.state.mainListDisplay !== true)
            this.setState({ mainListDisplay: true })
    }

    handleSearchFavorites() {
        if (this.state.mainListDisplay !== false)
            this.setState({ mainListDisplay: false })
    }

    handleChangePage(pageIndex) {
        this.setState({ startIndex: pageIndex }, this.triggerSearch)
    }

    render() {
        return (
            <main className='container-fluid col-md-6 col-md-offset-3'>
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
                <BookForm input={this.state.input} handleUp={this.handleKeyEvent} handleInputValue={this.handleInput} />
                <ShowCondition condition={this.state.bookList.length > 0}>
                    <Suspense fallback={<Spinner />}>
                        <BookList
                            booksList={this.state.mainListDisplay ? this.state.bookList : this.state.favoritesList} handleShowCard={this.handleShowCard} />
                        <Pagination items={this.state.totalVolume} itemsPerPage={this.state.booksPerPage}
                            handleChangePage={this.handleChangePage} />
                    </Suspense>
                </ShowCondition>
            </main>
        )
    }
}

export default Book