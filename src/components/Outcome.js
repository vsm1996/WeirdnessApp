import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Gif from "./Gif";
import { Link } from "react-router-dom";

import { resetState, getGifs } from "../actions/gifActions";

class Outcome extends Component {
  componentDidMount() {
    this.props.getGifs();
  }

  calculateWeirdness = () => {
    const { gifs } = this.props.gifs;
    let total = 0;
    if (gifs.length === 5) {
      gifs.forEach((gif, index) => {
        //console.log("gif weirdness: ", gif.weirdness);
        total = total + gif.weirdness;
        // console.log(`total for ${index}: `, total);
      });
      let avg = total / gifs.length;
      return Math.round(avg);
    } else {
      return total;
    }
  };

  onClick = e => {
    this.props.resetState();
  };

  render() {
    const { gifs } = this.props.gifs;
    const gifItem = gifs.map((gif, index) => {
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
          You scored {this.calculateWeirdness()} out of 10 on the weirdness
          scale!
        </h3>
        <p className="bold tl">The GIFS you liked</p>
        <div className="row flex-jc">{gifItem}</div>
        <Link to="/">
          {" "}
          <button className="btn btn-primary" onClick={this.onClick}>
            START OVER
          </button>{" "}
        </Link>
      </div>
    );
  }
}

Outcome.propTypes = {
  gifs: PropTypes.object.isRequired,
  getGifs: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  gifs: state.gifs
});

export default connect(
  mapStateToProps,
  { resetState, getGifs }
)(Outcome);
