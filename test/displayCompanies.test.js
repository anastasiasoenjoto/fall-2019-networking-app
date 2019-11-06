import React from 'react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import CompanyList from '../frontend/src/components/displayCompany';


describe('Display Company List Page', () => {
  
    it('renders correctly', () => {
      const wrapper = shallow(<CompanyList />);
      expect(wrapper).toMatchSnapshot();
    });

    it('display the correct number of companies as data sent from backend', () => {
      const userObj = new CompanyList(props);
      expect(userObj.state.users.length).greaterThan(0);
  })

  it('call componentDidMount', () => {
    const mockComponentDidMount = jest.fn();
    fn(mockComponentDidMount);
    expect(mockComponentDidMount).toBeCalled();
  })

  it('call componentDidMount only once', () => {
    const mockComponentDidMount = jest.fn();
    fn(mockComponentDidMount);
    expect(mockComponentDidMount.mock.calls.length).equal(1);
  })

  it('call render only once', () => {
    const mockRender = jest.fn();
    fn(mockRender);
    expect(mockRender.mock.calls.length).equal(1);
  })


})