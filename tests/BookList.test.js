import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import BookList from '../src/components/book/BookList'

configure({adapter: new Adapter()})

describe('Book List Component Tests', () => {
    const props = {
        mainList: true,
        booksList: books,
        favoritesList: books,
        handleShowCard:jest.fn(), 
        markFavorite:jest.fn(),
        removeFavorite:jest.fn()
    }

    const books = [
            {
            "kind": "books#volume",
            "id": "_ojXNuzgHRcC",
            "etag": "OTD2tB19qn4",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/_ojXNuzgHRcC",
            "volumeInfo": {
            "title": "Flowers",
            "authors": [
                "Vijaya Khisty Bodach"
            ],
            }
        }
    ]

    it('Component renders', () => {
        const wrapper = shallow(<BookList {...props} />)
        expect(wrapper.exists()).toBe(true)
    })

    it('Search list empty, props > books now is the favorites list', () => {
        const newProps = props
        newProps.mainList = undefined
        const wrapper = shallow(<BookList {...newProps} />)
        expect(wrapper.books).toEqual(props.favoritesList)
    })

    it('Favorites list empty, props > books now is the main list', () => {
        const newProps = props
        newProps.favoritesList = undefined
        const wrapper = shallow(<BookList {...newProps} />)
        expect(wrapper.books).toEqual(props.mainList)
    })

    xit('Check if the book of a list is favorite or not', () => {
        const wrapper = shallow(<BookList {...props}/>)
        const fnResult = wrapper.instance().checkFavorite(books[0])
        expect(fnResult).toBe(false)
    })
})