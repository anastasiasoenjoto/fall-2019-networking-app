import React from 'react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import CreateUser from '../frontend/src/components/CreateUser'




describe('Create User Page', () => {
  
  it('renders correctly', () => {
    const wrapper = shallow(<CreateUser />);
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
      <CreateUser />);
    
    wrapper.find('#signUpForm').props().onSubmit(event);
    expect(wrapper.state('firstName')).toEqual('');
    expect(wrapper.state('lastName')).toEqual('');
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('city')).toEqual('');
    expect(wrapper.state('major')).toEqual('');
    expect(wrapper.state('GPA')).toEqual('');

  });

  it('test for onChangefirstName', () => {
    const event = {
      target: { 
        value: 'firstNameTest'
      }
    };
    const wrapper = shallow(
      <CreateUser />);
    
    wrapper.find('#firstName').props().onChange(event);
    expect(wrapper.state('firstName')).toEqual('firstNameTest');
  });

  it('test for onChangelastName', () => {
    const event = {
      target: { value: 'lastNameTest'}
    }
    const wrapper = shallow(
      <CreateUser/>
    );
    wrapper.find('#lastName').props().onChange(event);
    expect(wrapper.state('lastName')).toEqual('lastNameTest');


  });

  it('test for onChangeUsername', () => {
    const event = {
      target: { value: 'usernameTest'}
    }
    const wrapper = shallow(
      <CreateUser/>
    );
    wrapper.find('#userName').props().onChange(event);
    expect(wrapper.state('username')).toEqual('usernameTest');


  });

  it('test for onChangeEmail', () => {
    const event = {
      target: { value: 'emailTest'}
    }
    const wrapper = shallow(
      <CreateUser />
    );
    wrapper.find('#email').props().onChange(event);
    expect(wrapper.state('email')).toEqual('emailTest');


  });

  it('test for onChangePassword', () => {
    const event = {
      target: { value: 'passwordTest'}
    }
    const wrapper = shallow(
      <CreateUser />
    );
    wrapper.find('#password').props().onChange(event);
    expect(wrapper.state('password')).toEqual('passwordTest');


  });

  it('test for onChangeCity', () => {
    const event = {
      target: { value: 'losAngeles'}
    }
    
    const wrapper = mount(
      <CreateUser/>
    );
    wrapper.find('#city').props().onChange(event);
    expect(wrapper.state('city')).toEqual('losAngeles');
  });

  it('test for onChangeMajor', () => {
    const event = {
      target: { value: 'anthropology'}
    }

    const wrapper = mount(
      <CreateUser/>
    );
    wrapper.find('#major').props().onChange(event);
    expect(wrapper.state('major')).toEqual('anthropology');
  });

  it('test for onChangeGPA', () => {
    const event = {
      target: { value: '3.54'}
    }
    const wrapper = shallow(
      <CreateUser/>,
    );
    wrapper.find('#GPA').props().onChange(event);
    expect(wrapper.state('GPA')).toEqual('3.54');


  });
})