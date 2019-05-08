import React from "react";
import PropTypes from "prop-types";

const Gif = props => {
  const { gifObj, gifImg } = props;
  return (
    <div className="p1 gif-section">
      <h3 className="bold">Your Result</h3>
      <section className="tc">
        <p>{gifObj.title}</p>
        <img src={gifImg} alt={gifObj.title} />
      </section>
    </div>
  );
};

Gif.propTypes = {};

export default Gif;
