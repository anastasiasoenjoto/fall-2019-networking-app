import React, { Component, useState } from 'react';
import axios from 'axios';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import { Link } from 'react-router-dom';

import './HomePage.css';


export default class HomePage extends Component {

   
    constructor(props) {
        super(props);
        this.state = {
            // users: [],
            username: '', 
            firstName: '',
            lastName: '',
            email:'',
            password:'',
            GPA:'',
            city:'',
            major:'', 
            recommendedUsers: []
        };
    }

    createChildrenNetwork = n => range(n).map(i => <div key={i} style={{ height: 200, background: '#fff' , border: 'solid black 1px', textAlign: "center"}}>
    <h4 className="networkCarouselItem"><b>Name: {this.state.recommendedUsers[i]}</b></h4><br></br><p className="networkCarouselItem"><i>Major: </i></p><br></br><p className="networkCarouselItem"><i>City:</i></p><button>Add</button>
    </div>);

    createChildrenJob = n => range(n).map(i => <div key={i} style={{ height: 200, background: '#fff' , border: 'solid black 1px', textAlign: "center"}}>
    <h4 className="networkCarouselItem"><b>Company: </b></h4><br></br><p className="networkCarouselItem"><i>Job Title: </i></p><br></br><p className="networkCarouselItem"><i>City:</i></p><button>Add</button>
    </div>);
    
    componentDidMount() {
        console.log(this.props.location.state.username)
        const user = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
                this.setState({username: u.username, firstName: u.firstName, lastName: u.lastName, email: u.email, password: u.password, city: u.city, major: u.major, GPA: u.GPA})
            })
        })

        this.setState({
            childrenNetwork: [],
            childrenJob: [],
            activeItemIndexNetwork: 0,
            activeItemIndexJob: 0

          });
      
          setTimeout(() => {
            this.setState({
                // Changes number of cards - will change based on like how many items we get.
              childrenNetwork: this.createChildrenNetwork(20),
              childrenJob: this.createChildrenJob(20),
            })
          }, 100);

         
        }

      

      changeActiveItemNetwork = (activeItemIndexNetwork) => this.setState({ activeItemIndexNetwork });
      changeActiveItemJob = (activeItemIndexJob) => this.setState({ activeItemIndexJob });


      getRecommendedUser() {

        const recommendedUser = {
            major: this.state.major,
            city: this.state.city
        }
        console.log(recommendedUser)
        axios.post('http://localhost:3001/users/getRecommendedUser', recommendedUser)
        .then(res => {
            console.log(res.data.users)
            this.setState({recommendedUser: res.data.user})
        });

      }

    //   IF USERNAME != this.state.username then show if equal dont show!
   

    

  render() {
    const {
        activeItemIndexNetwork,
        childrenNetwork,
        activeItemIndexJob, 
        childrenJob

      } = this.state;
    {this.getRecommendedUser()}
    
    return (
       
        <div id='home-page'> 
            <aside> 
                <nav>
                    <ul> 
                        <li className="home-nav-item"> <a href=""> Profile</a></li>
                        <li className="home-nav-item"> <a href=""> Message History</a></li>
                        <li className="home-nav-item"> <a href=""> Messaging</a></li>
                        <li className="home-nav-item"> <a href=""> Application History</a></li>
                    </ul>
                </nav>
            </aside>


            <div id="mainContent">
                {/* {this.state.users} */}
                <h1 id="homePageTitle" style={{textAlign: "left"}}> Welcome, {this.state.firstName} {this.state.lastName} </h1>
                {/* <h3>What do you want to do today? </h3> */}
                

                <div id="recommended">
                    <h2 className="carousel-header">  <b>Recommended Users</b></h2> 
                        <ItemsCarousel
                        // Placeholder configurations
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        minimumPlaceholderTime={1000}
                        placeholderItem={<div style={{ height: 200, background: '#fff', color: '#000' }}>Placeholder</div>}

                        // Carousel configurations
                        numberOfCards={3}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={false}

                        // Active item configurations
                        requestToChangeActive={this.changeActiveItemNetwork}
                        activeItemIndex={activeItemIndexNetwork}
                        activePosition={'center'}

                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {childrenNetwork}
                    </ItemsCarousel>
                
                </div>
                <Link > <i>View All Users</i></Link>
                <div id="all"> 
                <h2 className="carousel-header"> <b>Recommended Jobs</b></h2> 
                <ItemsCarousel
                        // Placeholder configurations
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        minimumPlaceholderTime={1000}
                        placeholderItem={<div style={{ height: 200, background: '#fff', color: '#000' }}>Placeholder</div>}

                        // Carousel configurations
                        numberOfCards={3}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={false}

                        // Active item configurations
                        requestToChangeActive={this.changeActiveItemJob}
                        activeItemIndex={activeItemIndexJob}
                        activePosition={'center'}

                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {childrenJob}
                    </ItemsCarousel>


                </div>
                <Link ><i>View All Jobs</i></Link>

            </div>

            
        </div>
   
    );
  }
}
