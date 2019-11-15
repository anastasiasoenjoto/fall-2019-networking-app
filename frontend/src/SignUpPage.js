import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUpBox from './components/SignUpOptions';


class SignUp extends React.Component {
    render() {
        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <SignUpBox></SignUpBox>
            </div>
        )
    }
    
  }

export default SignUp;