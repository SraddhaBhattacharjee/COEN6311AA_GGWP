import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Showcase from './components/Showcase'
import Destinations from './components/Destinations'
import Login from './components/Login.js'
import SignUp from './components/SignUp'
import Error from './components/Error'
import Home from './components/Home'

import 'bootstrap/dist/css/bootstrap.min.css';
import Booking from './components/Booking'
import Report from './components/Report'
import Flight from './components/Flight'
import CustomPackages from './components/CustomPackages'

function App() {
  return (
    <Router>


      <Switch>
        <Route exact path='/'>
          <Header />
          <Showcase />
          <Destinations />
        </Route>
        <Route path='/login'>
          <Header />
          <Login />
        </Route>
        <Route path='/signup'>
          <Header />
          <SignUp />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/booking'>
          <Booking />
        </Route>
        <Route path='/report/:id'>
          <Report />
        </Route>
        <Route path='/flights/:id'>
          <Flight />
        </Route>
        <Route path='/customPackages/:id'>
          <CustomPackages />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
