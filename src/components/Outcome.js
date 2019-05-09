import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Gif from "./Gif";

class Outcome extends Component {
  state = {
    gifs: []
  };

  static getDerivedStateFromProps(props, state) {
    const { gifs } = props;
    return { gifs: gifs };
  }

  calculateWeirdness = () => {
    const { gifs } = this.state;
    let total = 0;
    if (gifs.length === 5) {
      gifs.forEach((gif, index) => {
        //console.log("gif weirdness: ", gif.weirdness);
        total = total + gif.weirdness;
        // console.log(`total for ${index}: `, total);
      });
      let avg = total / gifs.length;
      return avg;
    } else {
      return total;
    }
  };

  render() {
    const gifItem = this.state.gifs.map((gif, index) => {
      return (
        <span key={index} className="gif-list-elem">
          {" "}
          <Gif gifProp={gif} /> {gif.weirdness}/10
        </span>
      );
    });

    return (
      <div className="container">
        <h3 className="p1">
          You scored an {this.calculateWeirdness()} out of 10 on the weirdness
          scale!
        </h3>
        <p className="bold tl">The GIFS you liked</p>
        {gifItem}
        <Link to="/">
          {" "}
          <button className="btn btn-primary" onClick={this.props.resetState}>
            START OVER
          </button>{" "}
        </Link>
      </div>
    );
  }
}

Outcome.propTypes = {
  gifs: PropTypes.array.isRequired
};

export default Outcome;
