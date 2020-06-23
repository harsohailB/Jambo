import React, { Component } from "react";
import "./App.css"
import Navbar from "./Navbar"
import AnnouncementHeader from "./AnnouncementHeader";
import Footer from "./Footer"
import HomePage from "./components/HomePage"
import CatalogPage from "./components/CatalogPage"
import StoryPage from "./components/StoryPage"
import ContactPage from "./components/ContactPage"
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <AnnouncementHeader/>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/catalog" component={CatalogPage}></Route>
            <Route path="/story" component={StoryPage}></Route>
            <Route path="/contact" component={ContactPage}></Route>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;