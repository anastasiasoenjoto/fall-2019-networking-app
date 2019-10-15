import React, { Component } from 'react';
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1> Sign Up </h1>
        <form>
          <fieldset>
          <legend class="formHeader"> Sign up Information</legend>
          {/* split first name and last name?  */}
          {/* on submit link to homepage?*/}
          {/* how to use js file? */}
          {/* how design will look like? */}
          <label>
            First Name: 
            <input type="text" placeholder="Enter first name"/>
          </label>
          <br></br>
            <label>
            Last Name: 
            <input type="text" placeholder="Enter last name"/>
          </label>
          <label>
            E-mail: 
            <input type="email" placeholder="Enter e-mail"/>
          </label>
          <br></br>
          <label>
            Password: 
            <input type="password" placeholder="Enter password"/>
          </label>
          <br></br>
          <label>
            City: 
            <select>
              <option>----Select a city-----</option>
              <optgroup label="California">
                <option value="losAngeles">Los Angeles</option>
                <option value="sanFrancisico">San Francisco</option>
              </optgroup>
              <optgroup label="New York">
              <option value="albany">Albany</option>
                <option value="newYork">New York </option>
              </optgroup>
              <optgroup label="Texas">
              <option value="austin">Austin</option>
                <option value="dallas">Dallas</option>
              </optgroup>

            </select>
          </label>
          </fieldset>
          <br></br>
          <fieldset>
            <legend class="formHeader"> Interest </legend>
            <label>
            Major: 
            <select>
              <option>----Select your major-----</option>
              
              <option value="anthropology">Anthropology</option>
              <option value="businessManagement">Business Management</option>
              <option value="computerScience">Computer Science</option>
              <option value="dataScience">Data Science</option>
            </select>
          </label>
          <br></br><br></br>
          <label>
            Please select up to 3 interests: <br></br>
            Animation <input type="checkbox" value="animation"/>
            Film <input type="checkbox" value="film"/>
            Machine Learning <input type="checkbox" value="machineLearning"/>
            Mobile Development <input type="checkbox" value="mobileDevelopment"/>
            Piano <input type="checkbox" value="piano"/>
          </label>
          </fieldset>
          <input type="submit"></input>
        </form>

      </div> 
      
      // <div>
      //   Home page
      // </div>
    )
  }
}
export default HomePage;

