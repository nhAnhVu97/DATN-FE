import React, { Component } from 'react';
// react router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
// component
import Navbar from './components/Navbar/Navbar'
import { Row, Col } from 'antd';
import LoginPage from './pages/Login/LoginPage';
import Logo from './logo.png';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);
class App extends Component {
  render() {
    if (localStorage.getItem("user") === null) {
      return (
        <LoginPage />
      )
    }
    return (
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="title">
              <img src={Logo} alt="logo.png" className="logo" />
              Trang quản trị
                    </div>
          </nav>
          <Row>
            <Col lg={5}>
              <Navbar />
            </Col>
            <Col lg={18}>
              {this.showContent(routes)}
            </Col>
          </Row>
        </div>
      </Router>
    );
  }

  // router 
  showContent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <PrivateRoute exact={route.exact} key={index} path={route.path} component={route.main} />
          // <Route
          //   key={index}
          //   path={route.path}
          //   exact={route.exact}
          //   component={route.main}
          // />
        )
      });

    }
    return <Switch>{result}</Switch>;
  }
}

export default App;
