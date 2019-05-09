import React, { Component } from "react";
import PropTypes from "prop-types";

class Result extends Component {
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
        {liked === true ? (
          <h5 className="red">Please like another GIF!</h5>
        ) : null}
        <section className="tc">
          <p>{gif.title}</p>
          <img className="" src={gif.images.downsized.url} alt={gif.title} />
        </section>
        <div className="tc mt1">
          <button
            className="btn btn-primary"
            disabled={liked}
            onClick={e => this.onClick(e)}
          >
            <i className="far fa-thumbs-up" />
          </button>
        </div>
      </div>
    );
  }
}

Result.propTypes = {
  gifObj: PropTypes.object.isRequired
};

export default Result;
