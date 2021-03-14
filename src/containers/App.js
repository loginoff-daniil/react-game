import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Game from "./Game";
import Editor from "./Editor";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;

  a {
    text-decoration: none;
    margin-top: 20px;
    font-size: 36px;
    font-weight: 900;
    color: black;
  }
`;

const App = () => (
  <Router>
    <Nav>
      <Link to="/editor">Editor</Link>
      <Link to="/">Game</Link>
    </Nav>
    <Route exact path="/" component={Game} />
    <Route path="/editor" component={Editor} />
  </Router>
);

export default App;
