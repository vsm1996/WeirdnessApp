import React, { Component } from "react";
import PropTypes from "prop-types";

class Gif extends Component {
  state = {
    gif: {},
    liked: false
  };

  static getDerivedStateFromProps = (props, state) => {
    const { gifObj } = props;
    //console.log("gifOBJ,  ", gifObj);
    return { gif: gifObj };
  };

  componentDidUpdate(prevProps, prevState) {
    const { liked } = prevState;
    if (liked) {
      this.setState({ liked: false });
    }
  }

  onClick = e => {
    const { gif } = this.state;
    this.props.likeClicked(e, gif);
    this.setState({ liked: true });
  };

  render() {
    const { gif, liked } = this.state;
    return (
      <div className="p1 gif-section">
        <h3 className="bold">Your Result</h3>
        <section className="tc">
          <p>{gif.title}</p>
          <p> {gif.weirdness} </p>
          <img className="" src={gif.images.downsized.url} alt={gif.title} />
        </section>
        <button disabled={liked} onClick={e => this.onClick(e)} className="">
          <i className="far fa-thumbs-up" />
        </button>
      </div>
    );
  }
}

Gif.propTypes = {
  gifObj: PropTypes.object.isRequired
};

export default Gif;
