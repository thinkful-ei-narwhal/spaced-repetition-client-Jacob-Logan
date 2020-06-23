import React, { Component } from 'react'
import Context from '../../contexts/UserContext'
import Dashboard from '../../components/Dashboard/Dashboard';
class DashboardRoute extends Component {

  static contextType = Context;
  render() {
    return (
      <section>
        <Dashboard />
      </section>
    );
  }
}

export default DashboardRoute
