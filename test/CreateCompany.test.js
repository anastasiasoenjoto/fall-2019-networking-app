import React from 'react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import CreateCompany from '../frontend/src/components/CreateCompany'



describe('Create Company User Page', () => {
  
  it('renders correctly', () => {
    const wrapper = shallow(<CreateCompany />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test for onSubmit', () => {
    const event = {
      preventDefault () {},
      target: { 
        value: ''
      }
    };
    const wrapper = shallow(
      <CreateCompany />);
    
    wrapper.find('#CompanySignUpForm').props().onSubmit(event);
    expect(wrapper.state('companyName')).toEqual('');
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('city')).toEqual('');

  });

  it('test for onChangeCompanyName', () => {
    const event = {
      target: { value: 'companyNameTest'}
    }
    const wrapper = shallow(
      <CreateCompany/>
    );
    wrapper.find('#companyName').props().onChange(event);
    expect(wrapper.state('companyName')).toEqual('companyNameTest');

  });

  it('test for onChangeUsername', () => {
    const event = {
      target: { value: 'usernameTest'}
    }
    const wrapper = shallow(
      <CreateCompany/>
    );
    wrapper.find('#username').props().onChange(event);
    expect(wrapper.state('username')).toEqual('usernameTest');


  });

  it('test for onChangeEmail', () => {
    const event = {
      target: { value: 'emailTest'}
    }
    const wrapper = shallow(
      <CreateCompany />
    );
    wrapper.find('#email').props().onChange(event);
    expect(wrapper.state('email')).toEqual('emailTest');
    
  });

  it('test for onChangePassword', () => {
    const event = {
      target: { value: 'passwordTest'}
    }
    const wrapper = shallow(
      <CreateCompany />
    );
    wrapper.find('#password').props().onChange(event);
    expect(wrapper.state('password')).toEqual('passwordTest');


  });

  it('test for onChangeCity', () => {
    const event = {
      target: { value: 'losAngeles'}
    }
    
    const wrapper = mount(
      <CreateCompany/>
    );
    wrapper.find('#city').props().onChange(event);
    expect(wrapper.state('city')).toEqual('losAngeles');
  });



})