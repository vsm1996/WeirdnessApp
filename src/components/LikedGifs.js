import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Gif from "./Gif";
import { Link } from "react-router-dom";

import { removeGif } from "../actions/gifActions";

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

  unlikeClick = (e, index) => {
    e.preventDefault();
    const { gifs, length } = this.state;
    //send index to store, where it will be spliced
    this.props.removeGif(index);
    //gifs.splice(index, 1);
    //this.setState({ gifs: gifs, length: length - 1 });
  };

  isDisabled = () => {
    if (this.state.length === 5) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    const gifItem = this.state.gifs.map((gif, index) => {
      return (
        <span key={index} className="gif-list-liked">
          <i
            onClick={e => this.unlikeClick(e, index)}
            className="fas icon fa-times"
          />
          <Gif gifProp={gif} />{" "}
        </span>
      );
    });

    return (
      <div className="p1 liked-section">
        <h6 className="bold">YOUR LIKED GIFS</h6>
        <section className="tc">{gifItem}</section>
        <div className="tc">
          <Link to="/outcome">
            {" "}
            <button className="btn btn-success m1" disabled={this.isDisabled()}>
              {" "}
              CALCULATE MY WEIRDNESS LEVEL{" "}
            </button>
          </Link>
          {this.state.length !== 5 ? (
            <p>
              {" "}
              You must <em>Like</em>{" "}
              <span className="red"> {5 - this.state.length} </span> more GIF(s)
              to calculate your score
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

LikedGifs.propTypes = {
  removeGif: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeGif }
)(LikedGifs);
