import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import BookForm from '../src/components/book/BookForm';

configure({adapter: new Adapter()})

describe('Book Form Component Tests', () => {
    const props = {
        input: 'Example text',
        handleUp: jest.fn(),
        handleInputValue: jest.fn()
    }

    it('Component renders', () => {
        const wrapper = shallow(<BookForm {...props} />)
        expect(wrapper.exists()).toBe(true)    
    })
})