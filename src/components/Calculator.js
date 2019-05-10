import React, { Component } from "react";
class Calculator extends Component {
  state = {
    newSearch: "",
    weirdness: 0,
    length: 0
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.length !== prevState.length) {
      return { length: nextProps.length };
    } else {
      return { length: prevState.length };
    }
  }

  onChange = e => {
    this.setState({ newSearch: e.target.value });
  };

  onChangeWeirdness = e => {
    let number = e.target.value;
    let weirdnessInt = parseInt(number, 10);
    this.setState({ weirdness: weirdnessInt });
  };

  isDisabled = () => {
    if (this.state.length === 5) {
      return true;
    } else {
      return false;
    }
  };

  onSubmit = (e, newSearch, weirdness) => {
    e.preventDefault();
    if (newSearch === "") {
      this.setState({ error: "Cannot be blank" });
    } else {
      this.props.handleSubmit(newSearch, weirdness);
    }
  };

  render() {
    const { newSearch, weirdness, length } = this.state;
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
        <form
          onSubmit={e => {
            this.onSubmit(e, newSearch, weirdness);
          }}
        >
          <label className="block text-muted" htmlFor="gif-search">
            Search term
          </label>
          {this.state.error && <p className="red">{this.state.error}</p>}
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

            <p>
              <em>Weirdness</em>: {weirdness}
            </p>
          </div>
          <button
            className="btn btn-primary"
            disabled={this.isDisabled()}
            type="submit"
          >
            {" "}
            SEARCH{" "}
          </button>
          {this.isDisabled() ? (
            <h5 className="red mt1"> You have liked 5 gifs! </h5>
          ) : null}
        </form>
      </div>
    );
  }
}

export default Calculator;
