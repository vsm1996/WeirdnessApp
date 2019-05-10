import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Key from "./utils/Key";
import "./App.css";

import Header from "./components/Header";
import Calculator from "./components/Calculator";
import Result from "./components/Result";
import LikedGifs from "./components/LikedGifs";
import Outcome from "./components/Outcome";

import { getGifs } from "./actions/gifActions";

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.getGifs();
  }

  handleFetch = (search, weirdness) => {
    const KEY = Key;
    const API_URL = `http://api.giphy.com/v1/gifs/translate?s=${search}&api_key=${KEY}&weirdness=${weirdness}`;
    fetch(API_URL)
      .then(res => res.json())
      .then(gif => {
        gif.data.weirdness = weirdness;
        this.setState({
          newGif: gif.data
        });
      })
      .catch(err => {
        console.log("error: ", err);
        this.setState({
          newGif: {}
        });
      });
  };

  render() {
    const { newGif } = this.state;
    const { gifs } = this.props.gifs;

    return (
      <Router>
        <Switch>
          <Fragment>
            <div className="App">
              <Header />
              <div className="row">
                <div className="col-sm-6 box">
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Calculator
                        length={gifs.length}
                        handleSubmit={this.handleFetch}
                      />
                    )}
                  />
                  {newGif ? (
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <Result length={gifs.length} gifObj={newGif} />
                      )}
                    />
                  ) : null}
                </div>
                <div className="col-sm-6 box">
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <LikedGifs length={gifs.length} gifs={gifs} />
                    )}
                  />
                </div>
              </div>

              <Route
                exact
                path="/outcome"
                render={() => <Outcome gifs={gifs} />}
              />
            </div>
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  getGifs: PropTypes.func.isRequired,
  gifs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gifs: state.gifs
});

export default connect(
  mapStateToProps,
  { getGifs }
)(App);
