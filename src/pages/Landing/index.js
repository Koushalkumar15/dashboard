import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import "./landing.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const Landing = ({match}) => (
  <div className="content">
    <Route exact path={`${match.url}/sign-up`} component={SignIn} />
    <Route path={`${match.url}/`} component={SignUp} />
  </div>
);

export default Landing;