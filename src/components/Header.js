import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header className="App-header">
      <Link to="/">
        <h1 className="white">Weirdness Calculator</h1>
      </Link>
    </header>
  );
};

export default Header;
