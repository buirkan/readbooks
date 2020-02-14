import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import Book from '../src/components/book/Book'

configure({ adapter: new Adapter() })

describe('Book Component Tests', () => {
  it('Component render', () => {
    const wrapper = shallow(<Book />)
    expect(wrapper.exists()).toBe(true)
  })

  it('URL query example', () => {
    const wrapper = shallow(<Book />)
    const URL = 'https://www.googleapis.com/books/v1/volumes?q=js&maxResults=18&orderBy=relevance&startIndex=0'
    expect(wrapper.instance().checkQuery(URL)).toBe(URL)
  })

  it('Setting new favorite', () => {
    const wrapper = shallow(<Book />)
    let book = {
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
    wrapper.instance().setNewFavorite([], book)
    expect(wrapper.state().totalFavorites).toBe(1)
  })
})