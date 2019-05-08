import React, { Component } from "react";
import Calculator from "./components/Calculator";
import Gif from "./components/Gif";
import LikedGifs from "./components/LikedGifs";
import Outcome from "./components/Outcome";
import "./App.css";

class App extends Component {
  state = {
    gifs: [],
    newGifUrl: ""
  };

  handleSubmit = (event, search, weirdness) => {
    event.preventDefault();
    this.handleFetch(search, weirdness);
  };

  handleFetch = (search, weirdness) => {
    const KEY = "iNfVNqEv4pF2luxPCXT51odSlQA7nIC2";
    const API_URL = `http://api.giphy.com/v1/gifs/translate?s=${search}&api_key=${KEY}&weirdness=${weirdness}`;
    console.log("URL: ", API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(gif => {
        console.log("DATA: ", gif.data);
        this.setState({
          newGif: gif.data,
          newGifUrl: gif.data.images.downsized.url
        });
      })
      .catch(err => {
        console.log("error: ", err);
      });
  };

  render() {
    const { newGif, newGifUrl } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weirdness Calculator</h1>
        </header>
        <div className="row">
          <div className="col-sm-7 box">
            <Calculator handleSubmit={this.handleSubmit} />
            {newGif ? <Gif gifObj={newGif} gifImg={newGifUrl} /> : null}
          </div>
          <div className="col-sm box">
            <LikedGifs />
          </div>
        </div>
        <Outcome />
      </div>
    );
  }
}

export default App;
