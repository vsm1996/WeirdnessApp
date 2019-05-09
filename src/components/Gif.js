import React, { Component } from "react";
import PropTypes from "prop-types";

class Gif extends Component {
  state = {
    gif: {}
  };

  static getDerivedStateFromProps(props, state) {
    const { gifProp } = props;
    return {
      gif: gifProp
    };
  }

  render() {
    const { gif } = this.state;
    return (
      <div>
        <p>{gif.title}</p>
        <img className="" src={gif.images.fixed_width.url} alt={gif.title} />
      </div>
    );
  }
}

Gif.propTypes = {
  gifProp: PropTypes.object.isRequired
};

export default Gif;
