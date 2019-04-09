import React from 'react';
import { Route, Link } from 'react-router-dom'
import Users from '../users'
import About from '../about'
import ActiveUser from '../activeUser'

const App = () => (
  <div className="container">
    <header>
      <Link to={`${process.env.PUBLIC_URL}/`}>Users</Link>
      <Link to={`${process.env.PUBLIC_URL}/about-us`}>About</Link>
    </header>

    <main>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={Users} />
      <Route path={`${process.env.PUBLIC_URL}/users/:id`} component={ActiveUser} />
      <Route exact path={`${process.env.PUBLIC_URL}/about-us`} component={About} />
    </main>
  </div>
)

export default App
