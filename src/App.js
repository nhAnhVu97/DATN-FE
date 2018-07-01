import React, { Component } from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
// component
import Navbar from './components/Navbar/Navbar'
import { Row, Col } from 'antd';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="title">
              <img src="./asset/images/logo.png" alt="logo.png" className="logo" />
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
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )
      });

    }
    return <Switch>{result}</Switch>;
  }
}

export default App;
