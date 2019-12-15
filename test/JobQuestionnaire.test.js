import React from 'react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import JobQuestionnaire from '../frontend/src/components/JobQuestionnaire'




describe('Job Application', () => {
  
  it('renders correctly', () => {
    const wrapper = shallow(<JobQuestionnaire />);
    expect(wrapper).toMatchSnapshot();
  });

  it('test for onChangeName', () => {
    const event = {
      target: { 
        value: 'companyUsernameTest'
      }
    };
    const wrapper = shallow(
      <JobQuestionnaire />);
    
    wrapper.find('#companyUsername').props().onChange(event);
    expect(wrapper.state('companyUsername')).toEqual('companyUsernameTest');
  });

  it('test for onChangeTitle', () => {
    const event = {
      target: { value: 'jobTitleTest'}
    }
    const wrapper = shallow(
      <JobQuestionnaire/>
    );
    wrapper.find('#jobTitle').props().onChange(event);
    expect(wrapper.state('jobTitle')).toEqual('jobTitleTest');


  });

  it('test for onChangeNumOfPositions', () => {
    const event = {
      target: { value: 'testPositionValue'}
    }
    const wrapper = shallow(
      <JobQuestionnaire />
    );
    wrapper.find('#numOfPositions').props().onChange(event);
    expect(wrapper.state('numOfPositions')).toEqual('testPositionValue');


  });

  it('test for onChangeJobDescription', () => {
    const event = {
      target: { value: 'jobDescription'}
    }
    const wrapper = shallow(
      <JobQuestionnaire />
    );
    wrapper.find('#jobDescription').props().onChange(event);
    expect(wrapper.state('jobDescription')).toEqual('jobDescription');


  });

  it('test for onChangeJobLocation', () => {
    const event = {
      target: { value: 'jobLocation'}
    }
    
    const wrapper = mount(
      <JobQuestionnaire/>
    );
    wrapper.find('#jobLocation').props().onChange(event);
    expect(wrapper.state('jobLocation')).toEqual('jobLocation');
  });

  it('test for onChangeSalary', () => {
    const event = {
      target: { value: '25'}
    }

    const wrapper = mount(
      <JobQuestionnaire/>
    );
    wrapper.find('#jobSalary').props().onChange(event);
    expect(wrapper.state('jobSalary')).toEqual('25');
  });

  it('test for onChangeGPA', () => {
    const event = {
      target: { value: '3.54'}
    }
    const wrapper = shallow(
      <JobQuestionnaire/>,
    );
    wrapper.find('#gpaReq').props().onChange(event);
    expect(wrapper.state('gpaReq')).toEqual('3.54');


  });
  it('test for onChangeMajor', () => {
    const event = {
      target: { value: 'math'}
    }
    const wrapper = shallow(
      <JobQuestionnaire/>,
    );
    wrapper.find('#majorReq').props().onChange(event);
    expect(wrapper.state('majorReq')).toEqual('math');


  });

  it('test for onChangeAppDeadline', () => {
    const event = {
      target: { value: 'testValue'}
    }
    const wrapper = shallow(
      <JobQuestionnaire/>,
    );
    wrapper.find('#applicationDeadline').props().onChange(event);
    expect(wrapper.state('applicationDeadline')).toEqual('testValue');


  });

  it('test for onChangeSkills', () => {
    const event = {
      target: { value: 'testValue'}
    }
    const wrapper = shallow(
      <JobQuestionnaire/>,
    );
    wrapper.find('#skills').props().onChange(event);
    expect(wrapper.state('skills')).toEqual('testValue');


  });
})