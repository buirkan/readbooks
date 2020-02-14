import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import Pagination from '../src/components/pagination/Pagination'

configure({ adapter: new Adapter() })

describe('Pagination Component Tests', () => {
  const props = {
    mainList: true,
    items:[{}],
    favorites:[],
    itemsPerPage:18,
    handleChangePage: jest.fn()
  }

  it('Component render', () => {
    const wrapper = shallow(<Pagination {...props}/>)
    expect(wrapper.exists()).toBe(true)
  })
})