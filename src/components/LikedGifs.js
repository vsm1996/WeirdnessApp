import React, { Component } from "react";
import { Link } from "react-router-dom";

class LikedGifs extends Component {
  state = {
    gifs: [],
    unliked: false,
    length: 0
  };

  static getDerivedStateFromProps = (props, state) => {
    const { gifs, length } = props;
    //console.log("gifs,  ", gifs);
    return { gifs, length };
  };

  gifItem = () => {
    //console.log(this.state.gifs);
    return this.state.gifs.map((gif, index) => (
      <div key={index}>{gif.title}</div>
    ));
  };

  isDisabled = () => {
    if (this.state.length === 5) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    return (
      <div className="p1">
        <p>LikedGifs List</p>
        {this.gifItem()}
        <Link to="/outcome">
          {" "}
          <button disabled={this.isDisabled()}> Weirdness Level </button>
        </Link>
      </div>
    );
  }
}

export default LikedGifs;
