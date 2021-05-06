import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Service from './Pages/Service/Service'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Navbar from './Pages/Components/Navbar/Navbar'
import Mypage from './Pages/Mypage/Mypage'
import MypageDetail from './Pages/MypageDetail/MypageDetail'

function Routes() {
  const globalToken = useSelector((store) => store.tokenReducer)

  console.log(globalToken)
  return (
    <Router>
      <Navbar globalToken={globalToken} />
      <Switch>
        <Route exact path="/" component={Service} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/mypage/order" component={Mypage} />
        <Route exact path="/mypage/order/:id" component={MypageDetail} />
      </Switch>
    </Router>
  )
}

export default Routes
