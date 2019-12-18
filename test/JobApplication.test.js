import React from 'react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import JobApplication from '../frontend/src/components/JobApplicationForm.js'




describe('Job Application', () => {
  
  it('renders correctly', () => {
    const wrapper = shallow(<JobApplication />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test for onChangeName', () => {
    const event = {
      target: { 
        value: 'firstNameTest'
      }
    };
    const wrapper = shallow(
      <JobApplication />);
    
    wrapper.find('#nameOfApplicant').props().onChange(event);
    expect(wrapper.state('nameOfApplicant')).toEqual('firstNameTest');
  });

  it('test for onChangePhone', () => {
    const event = {
      target: { value: 'phoneNumb'}
    }
    const wrapper = shallow(
      <JobApplication/>
    );
    wrapper.find('#phone').props().onChange(event);
    expect(wrapper.state('PhoneNumber')).toEqual('phoneNumb');


  });

  it('test for onChangeEmail', () => {
    const event = {
      target: { value: 'emailTest'}
    }
    const wrapper = shallow(
      <JobApplication />
    );
    wrapper.find('#email').props().onChange(event);
    expect(wrapper.state('email')).toEqual('emailTest');


  });

  it('test for onChangeSkills', () => {
    const event = {
      target: { value: 'skillsTest'}
    }
    const wrapper = shallow(
      <JobApplication />
    );
    wrapper.find('#skill').props().onChange(event);
    expect(wrapper.state('skill')).toEqual('skillsTest');


  });

  it('test for onChangeResume', () => {
    const event = {
      target: { value: 'testURL'}
    }
    
    const wrapper = mount(
      <JobApplication/>
    );
    wrapper.find('#resume').props().onChange(event);
    expect(wrapper.state('resume')).toEqual('testURL');
  });

  it('test for onChangeMajor', () => {
    const event = {
      target: { value: 'anthropology'}
    }

    const wrapper = mount(
      <JobApplication/>
    );
    wrapper.find('#major').props().onChange(event);
    expect(wrapper.state('major')).toEqual('anthropology');
  });

  it('test for onChangeGPA', () => {
    const event = {
      target: { value: '3.54'}
    }
    const wrapper = shallow(
      <JobApplication/>,
    );
    wrapper.find('#GPA').props().onChange(event);
    expect(wrapper.state('GPA')).toEqual('3.54');


  });
})