import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure,  } from 'enzyme'
import BookCard from '../src/components/book/BookCard'

configure({adapter: new Adapter()})

describe('Book Card Component Tests', () => {
    const book = {
        title: 'Book for test',
        subtitle: 'Just an book for testing',
        volumeInfo: {},
        authors: ['Generic Author'],
        publisher: 'Generic Publisher',
        releaseDate: '01/01/2020',
        synopsis: 'Testing',
        pageCount: '300',
        categories: ['Science'],
        language: 'pt-BR',
        preview: 'previewLink',
        info: 'infoLink',
    }
    const props = {
        book: book,
        handleClose: jest.fn()
    }

    it('Component renders', () => {
        const wrapper = shallow(<BookCard {...props}/>)
        expect(wrapper.exists()).toBe(true)
    })
})