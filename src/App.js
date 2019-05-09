import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Key from "./utils/Key";
import "./App.css";

import Header from "./components/Header";
import Calculator from "./components/Calculator";
import Result from "./components/Result";
import LikedGifs from "./components/LikedGifs";
import Outcome from "./components/Outcome";

const initialState = {
  gifs: []
};
class App extends Component {
  state = {
    gifs: []
  };

  handleFetch = (event, search, weirdness) => {
    event.preventDefault();
    const KEY = Key;
    const API_URL = `http://api.giphy.com/v1/gifs/translate?s=${search}&api_key=${KEY}&weirdness=${weirdness}`;
    //console.log("URL: ", API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(gif => {
        //console.log("DATA: ", gif.data);
        gif.data.weirdness = weirdness;
        this.setState({
          newGif: gif.data
        });
      })
      .catch(err => {
        console.log("error: ", err);
      });
  };

  resetState = () => {
    this.setState(initialState);
  };

  likeClicked = (e, gif) => {
    e.preventDefault();
    //console.log("clicked: ", liked, gif);
    this.setState({ gifs: this.state.gifs.concat(gif) });
  };

  render() {
    const { newGif, gifs } = this.state;
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
                        <Result
                          gifObj={newGif}
                          likeClicked={this.likeClicked}
                        />
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
                render={() => (
                  <Outcome resetState={this.resetState} gifs={gifs} />
                )}
              />
            </div>
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default App;
