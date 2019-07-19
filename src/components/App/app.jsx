import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from 'components/pages/Login';
import Toastr from 'components/Toastr';
import Registration from 'components/pages/Registration';
import Profile from 'components/pages/Profile';
import Modal from 'components/Modal';

class App extends React.Component {

  render() {
    const { show } = this.props;
    const token = localStorage.getItem('token');
    return(
      <React.Fragment>
        <Toastr />
        {show && <Modal />}
        <Router>
          <Switch>
            <Route
              path='/'
              render={() => (
                token
                  ? <Profile />
                  : <Redirect to='/login' />
              )}
              exact />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
};

const mapSateToProps = ({ showModal }) => {
  return { show: showModal.show };
}

export default connect(mapSateToProps)(App);