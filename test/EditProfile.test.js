import React from 'react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import UserProfile from '../frontend/src/components/UserProfile.js'




describe('Edit profile', () => {
  
  it('renders correctly', () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test for onChangefirstName', () => {
    const event = {
      target: { 
        value: 'firstNameTest'
      }
    };
    const wrapper = shallow(
      <UserProfile />);
    
    wrapper.find('#firstName').props().onChange(event);
    expect(wrapper.state('firstName')).toEqual('firstNameTest');
  });

  it('test for onChangelastName', () => {
    const event = {
      target: { value: 'lastNameTest'}
    }
    const wrapper = shallow(
      <UserProfile/>
    );
    wrapper.find('#lastName').props().onChange(event);
    expect(wrapper.state('lastName')).toEqual('lastNameTest');


  });

  it('test for onChangeEmail', () => {
    const event = {
      target: { value: 'emailTest'}
    }
    const wrapper = shallow(
      <UserProfile />
    );
    wrapper.find('#email').props().onChange(event);
    expect(wrapper.state('email')).toEqual('emailTest');


  });

  it('test for onChangePassword', () => {
    const event = {
      target: { value: 'passwordTest'}
    }
    const wrapper = shallow(
      <UserProfile />
    );
    wrapper.find('#password').props().onChange(event);
    expect(wrapper.state('password')).toEqual('passwordTest');


  });

  it('test for onChangeCity', () => {
    const event = {
      target: { value: 'losAngeles'}
    }
    
    const wrapper = mount(
      <UserProfile/>
    );
    wrapper.find('#city').props().onChange(event);
    expect(wrapper.state('city')).toEqual('losAngeles');
  });

  it('test for onChangeMajor', () => {
    const event = {
      target: { value: 'anthropology'}
    }

    const wrapper = mount(
      <UserProfile/>
    );
    wrapper.find('#major').props().onChange(event);
    expect(wrapper.state('major')).toEqual('anthropology');
  });

  it('test for onChangeGPA', () => {
    const event = {
      target: { value: '3.54'}
    }
    const wrapper = shallow(
      <UserProfile/>,
    );
    wrapper.find('#GPA').props().onChange(event);
    expect(wrapper.state('GPA')).toEqual('3.54');


  });
})