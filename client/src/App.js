import React, { memo, useEffect } from 'react';
import HomePage from './containers/HomePage';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar';
import NavDrawer from './components/NavDrawer';
import { BrowserRouter as Router, withRouter, Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import LeadPage from './containers/LeadPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import jwt_decode from 'jwt-decode';
import { handleSignIn, setLogout, signIn } from './actions/auth';
import './App.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin ? <Component {...props} /> : <Redirect to="/aunthorized" />
    }
  />
);

function App({setUser, loginUser, loginError, isAuthenticated, isAdmin, logout, history}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (localStorage.jwtToken) {
      checkTokenExpiry();
    }
  }, [])

  const handleSignIn = user => {
    loginUser(user);
  }

  const handleLogout = () => {
    logout();
    history.push('/login')
  }

  const checkTokenExpiry = () => {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // to get in milliseconds
    setUser(decoded);
    if (decoded.exp < currentTime) {
      setUser(null);
      // history.push('/login');
    }
  }

  return (
    <div className="App">
        {isAuthenticated && (
          <div className={classes.root}>
            <CssBaseline />
            <NavBar
              onNavClick={handleDrawerToggle}
            />
            <NavDrawer
              mobileOpen={mobileOpen}
              onNavClick={handleDrawerToggle}
              isAdmin={isAdmin}
              logout={() => handleLogout()}
            />
            <PrivateRoute isAdmin={isAdmin} exact path="/users" component={HomePage} />
            <PrivateRoute
                  isAdmin={!isAdmin}
                  path="/leads"
                  component={LeadPage}
                />
          </div>
        )}
        {!isAuthenticated && (
            <LoginPage onSignInClick={user => handleSignIn(user)} err={loginError && loginError.err ? loginError.errMsg : ''}/>
          )}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  loginUser: user => dispatch(handleSignIn(user)),
  setUser: user => dispatch(signIn(user)),
  logout: () => {
    localStorage.removeItem('jwtToken');
    dispatch(setLogout({}));
  },
});

const mapStateToProps = state => ({
  isAdmin: state.user ? state.user.admin : null,
  isAuthenticated: state.user ? state.isAuthenticated: undefined,
  loginErr: state.err,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withRouter(App));