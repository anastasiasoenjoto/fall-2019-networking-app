import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUpOptions from './components/SignUpOptions';

function SignUp() {
    return (
        <Router>
            <SignUpOptions></SignUpOptions>
        </Router>
    );
  }

export default SignUp;