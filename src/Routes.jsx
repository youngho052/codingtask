import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Service from './Pages/Service/Service'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Navbar from './Pages/Components/Navbar/Navbar'

function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Service} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={Signup} />
      </Switch>
    </Router>
  )
}

export default Routes
