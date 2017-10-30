import React from 'react';
import { Route, Link } from 'react-router-dom'
import Users from '../users'
import About from '../about'
import ActiveUser from '../activeUser'

const App = () => (
  <div className="container">
    <header>
      <Link to="/">Users</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Users} />
      <Route path="/users/:id" component={ActiveUser} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
