import React, { Component } from 'react';
import axios from 'axios';

export default class displayJobs extends Component {
  constructor(props) {
    super(props);
    this.onChangenameOfOpenPosition = this.onChangenameOfOpenPosition.bind(this);
    this.onChangegpaRequirement = this.onChangegpaRequirement.bind(this);
    this.onChangeworkLocation = this.onChangeworkLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gpaRequirement: '', 
      workLocation: '',
      jobs: []
    }
  }

  onChangenameOfOpenPosition(e) {
    this.setState({
        nameOfOpenPosition: e.target.value
    })
  }

  onChangegpaRequirement(e) {
    this.setState({
      gpaRequirement: e.target.value
    })
  }

  onChangeworkLocation(e) {
    this.setState({
      workLocation: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const displayJobs = {
      nameOfOpenPosition: this.state.nameOfOpenPosition,
      workLocation: this.state.workLocation, 
      gpaRequirement: this.state.gpaRequirement,
    }
    axios.post('http://localhost:3001/jobs/queryJobs', displayJobs)
    .then(res => {
      console.log(res.data.jobs);
      return res.data.jobs
    })
    .then(data=> {
            let jobs = data.map((u) => {
                return(
                    <div key={u.nameOfOpenPosition}>
                        <h4>City: {u.workLocation}</h4>
                        <p><i>gpaRequirement: {u.gpaRequirement}</i></p>

                    </div>
                )
            })
            this.setState({jobs: jobs});
        })

    this.state = {
      nameOfOpenPosition: displayJobs.nameOfOpenPosition,
      gpaRequirement: displayJobs.gpaRequirement, 
      workLocation: displayJobs.workLocation,
      jobs: []
    }

  }

  render() {
    return (
      <div>
           {this.state.jobs}
          <form onSubmit={this.onSubmit}>
        <h1> Filter Jobs </h1>
        <label>
            Job Title: 
            <input id="nameOfOpenPosition" type="text" value={this.state.nameOfOpenPosition} onChange= {this.onChangenameOfOpenPosition} plceholder="Enter Title"/>
          </label>
      <br></br>
      <fieldset>
          <label>
            City: <select id="workLocation" value={this.state.workLocation} onChange= {this.onChangeworkLocation}>      
              <option>----Select a city-----</option>
              <optgroup label="California">
                <option value="losAngeles">Los Angeles</option>
                <option value="sanFrancisico">San Francisco</option>
              </optgroup>
              <optgroup label="New York">
              <option value="albany">Albany</option>
                <option value="newYork">New York </option>
              </optgroup>
              <optgroup label="Texas">
              <option value="austin">Austin</option>
                <option value="dallas">Dallas</option>
              </optgroup>

            </select>
          </label>
          </fieldset>
          <label>
            GPA:  
            <input id="gpaRequirement" type="text" value={this.state.gpaRequirement} onChange= {this.onChangegpaRequirement} plceholder="Enter GPA"/>
          </label>
          <br></br>
          <input type="submit"></input>
        </form>

      </div> 
    )
  }
}