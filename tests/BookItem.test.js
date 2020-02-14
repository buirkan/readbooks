import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import BookItem from '../src/components/book/BookItem'

configure({adapter: new Adapter()})

// const wrapper
// test it
// beforeEach(() => {
//     wrapper = shallow(<BookItem {...props}/>)
// })

describe('Book Item Component tests', () => {
    const book = {
        title: 'Book for test',
        subtitle: 'Just an book for testing',
        volumeInfo: {},
        authors: ['Generic Author'],
        publisher: 'Generic Publisher',
        releaseDate: '01/01/2020',
        synopsis: 'Testing',
        pageCount: '300',
        categories: 'Science',
        language: 'pt-BR',
        preview: 'previewLink',
        info: 'infoLink',
    }
    const props = {
        book: book,
        isAlreadyFavorite: false,
        markFavorite: jest.fn(),
        removeFavorite: jest.fn()
    }
    
    it('Component render', () => {
        const wrapper = shallow(<BookItem {...props} />)
        expect(wrapper.exists()).toBe(true)
    })

    it('Setting book as favorite', () => {
        const wrapper = shallow(<BookItem {...props} />)
        wrapper.setState({ isFavorite: false })
        wrapper.instance().setBookAsFavorite(book)
        expect(wrapper.state().isFavorite).toBe(true)
    })

    it('Book is already favorite', () => {
        let newProps = props
        newProps.isAlreadyFavorite = true
        
        const wrapper = shallow(<BookItem {...newProps} />)
        wrapper.instance().componentDidMount()
        expect(wrapper.state().isFavorite).toBe(true)
    })

    it('Removing book from favorites list', () => {
        const wrapper = shallow(<BookItem {...props}/>)

        wrapper.setState({ isFavorite: true })
        wrapper.instance().setBookAsFavorite(book)
        expect(wrapper.state().isFavorite).toBe(false)
    })

    it('Handle method to show card details', () => {
        const wrapper = shallow(<BookItem {...props}/>)

        wrapper.setState({showCard: false})
        wrapper.instance().handleShowCard({})
        expect(wrapper.state().showCard).toBe(true)
    })

    it('Handle method to hide card details', () => {
        const wrapper = shallow(<BookItem {...props}/>)
        wrapper.instance().handleHideCard()
        expect(wrapper.state().showCard).toBe(false)
    })
})