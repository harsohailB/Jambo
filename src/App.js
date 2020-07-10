import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import AnnouncementHeader from "./AnnouncementHeader";
import Footer from "./Footer";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import StoryPage from "./components/StoryPage";
import ContactPage from "./components/ContactPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ShoppingCartPage from "./components/ShoppingCartPage";
import SearchPage from "./components/SearchPage";
import ItemPage from "./components/ItemPage";
import LoginPage from "./components/LoginPage";
import AddItemPage from "./components/AddItemPage";
import ls from "local-storage";
import { useDispatch } from "react-redux";
import { LOGIN_USER, LOGOUT_USER, FETCH_SC_ITEMS } from "./actions/types";
import CheckoutPage from "./components/CheckoutPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromLocalStorage = ls.get("user");
    const shoppingCartItemsFromLocalStorage = ls.get("shoppingCart");

    if (userFromLocalStorage) {
      dispatch({ type: LOGIN_USER, user: userFromLocalStorage });
    } else {
      dispatch({ type: LOGOUT_USER });
    }

    if (shoppingCartItemsFromLocalStorage) {
      dispatch({
        type: FETCH_SC_ITEMS,
        items: shoppingCartItemsFromLocalStorage,
      });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <AnnouncementHeader />
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/catalog/:id" component={ItemPage}></Route>
          <Route path="/catalog" component={CatalogPage}></Route>
          <Route path="/story" component={StoryPage}></Route>
          <Route path="/contact" component={ContactPage}></Route>
          <Route path="/cart" component={ShoppingCartPage}></Route>
          <Route path="/search" component={SearchPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/add-item" component={AddItemPage}></Route>
          <Route path="/checkout" component={CheckoutPage}></Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
