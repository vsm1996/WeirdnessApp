import React, { Component } from "react";

class Calculator extends Component {
  state = {
    newSearch: "",
    weirdness: 0
  };

  onChange = e => {
    this.setState({ newSearch: e.target.value });
  };
  onChangeWeirdness = e => {
    this.setState({ weirdness: e.target.value });
  };

  render() {
    const { newSearch, weirdness } = this.state;
    return (
      <div className="p1">
        <p>
          Find out how weird you are by selecting the GIFS that make you laugh.
          We'll show you the least weird ones to start, but you can move the
          slider to make them weirder.
        </p>
        <br />
        <p>
          When you find a GIF you like, press the Like button. Once you like 5
          GIFS we'll show you how weird you are.
        </p>
        <p>
          <em>Weirdness</em>: {weirdness}
        </p>
        <form
          onSubmit={e => {
            this.props.handleSubmit(e, newSearch, weirdness);
          }}
        >
          <label htmlFor="gif-search" />
          <input
            id="gif-search"
            onChange={this.onChange}
            name="gifsearch"
            type="text"
            value={this.state.newSearch}
          />
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="10"
              value={weirdness}
              onChange={this.onChangeWeirdness}
              className="slider"
              id="myRange"
            />
          </div>
          <button type="submit"> SEARCH </button>
        </form>
      </div>
    );
  }
}

export default Calculator;
