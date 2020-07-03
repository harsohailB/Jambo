import React, { Component } from "react";
import "./App.css"
import { ShoppingCartProvider } from "./ShoppingCartContext"
import { UserProvider } from "./UserContext"
import Navbar from "./Navbar"
import AnnouncementHeader from "./AnnouncementHeader";
import Footer from "./Footer"
import HomePage from "./components/HomePage"
import CatalogPage from "./components/CatalogPage"
import StoryPage from "./components/StoryPage"
import ContactPage from "./components/ContactPage"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ShoppingCartPage from "./components/ShoppingCartPage";
import SearchPage from "./components/SearchPage";
import ItemPage from "./components/ItemPage";
import LoginPage from "./components/LoginPage";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <UserProvider>
            <ShoppingCartProvider>
              <div className="app-container">
                <AnnouncementHeader/>
                <Navbar/>
                <Switch>
                  <Route exact path="/" component={HomePage}></Route>
                  <Route path="/catalog/:id" component={ItemPage}></Route>
                  <Route path="/catalog" component={CatalogPage}></Route>
                  <Route path="/story" component={StoryPage}></Route>
                  <Route path="/contact" component={ContactPage}></Route>
                  <Route path="/cart" component={ShoppingCartPage}></Route>
                  <Route path="/search" component={SearchPage}></Route>
                  <Route path="/login" component={LoginPage}></Route>
                </Switch>
                <Footer/>
              </div>
            </ShoppingCartProvider>
          </UserProvider>
        </BrowserRouter>
    );
  }
}

export default App;