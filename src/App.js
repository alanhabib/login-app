import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./Components/Login";
import Dashboard from "./Screens/Dashboard";
import Home from "./Screens/Home";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <small>(Access without token only)</small>
          <NavLink activeClassName="active" to="/dashboard">
            Dashboard
          </NavLink>
          <small>(Access with token only)</small>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;
