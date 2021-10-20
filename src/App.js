// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import React from "react";
import Home from "./Components/Home";
import Signout from "./Components/Signout";

class App extends React.Component {
  Home = React.lazy(() => import("./Components/Home"));
  constructor() {
    super();
    this.state = {
      userData: {},
      isAuthenticated: false,
    };
    this.setAuthenticationHandler = this.setAuthenticationHandler.bind(this);
  }

  setAuthenticationHandler(userCredencials) {
    if (userCredencials.id !== undefined) {
      this.setState({ isAuthenticated: true });
      this.setState({
        userData: {
          email: userCredencials.email,
          password: userCredencials.password,
        },
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                positronX.io
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  {!this.state.isAuthenticated && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-in"}>
                          Login
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>
                          Sign up
                        </Link>
                      </li>
                    </>
                  )}

                  {this.state.isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/Home"}>
                        Home
                      </Link>
                    </li>
                  )}
                  {this.state.isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-out"}>
                        Log out
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div
              className={
                "auth-inner " +
                (this.state.isAuthenticated ? "main-container" : "")
              }
            >
              <Switch>
                {!this.state.isAuthenticated && (
                  <>
                    {" "}
                    <Route exact path="/">
                      <Login parentCallback={this.setAuthenticationHandler} />
                    </Route>
                    <Route path="/sign-in">
                      <Login parentCallback={this.setAuthenticationHandler} />
                    </Route>
                    <Route path="/sign-up" component={Signup} />
                  </>
                )}
                {this.state.isAuthenticated && (
                  <>
                    <Route path="/Home">
                      <Home email={this.state.userData.email} />
                    </Route>

                    <Route path="/Signout">
                      <Signout />
                    </Route>
                  </>
                )}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
