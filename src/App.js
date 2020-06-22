import React, { Component } from "react";
import Home from "./components/HomePage/Home";
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Home />
      </div>
    );
  }
}

export default App;