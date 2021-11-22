import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import AnnouncementHeader from "./AnnouncementHeader";
import Footer from "./Footer";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import StoryPage from "./components/StoryPage";
import ContactPage from "./components/ContactPage";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ShoppingCartPage from "./components/ShoppingCartPage";
import ItemPage from "./components/ItemPage";
import LoginPage from "./components/LoginPage";
import AddItemPage from "./components/AddItemPage";
import ls from "local-storage";
import { useDispatch } from "react-redux";
import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_SC_ITEMS,
  PRUNE_CART,
} from "./actions/types";
import EditItemPage from "./components/EditItemPage";
import { Helmet } from "react-helmet";
import SubscriberPage from "./components/SubscriberPage";
import SuccessPage from "./components/SuccessPage";
import { getItems } from "./actions/items";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromLocalStorage = ls.get("user");
    const shoppingCartItemsFromLocalStorage = ls.get("shoppingCart");

    // Loads user from local storage
    if (userFromLocalStorage) {
      dispatch({ type: LOGIN_USER, user: userFromLocalStorage });
    } else {
      dispatch({ type: LOGOUT_USER });
    }

    // Loads item to shopping cart from local storage
    if (shoppingCartItemsFromLocalStorage) {
      dispatch({
        type: FETCH_SC_ITEMS,
        items: shoppingCartItemsFromLocalStorage,
      });
    }

    // Prunes items from cart that have been removed from store
    getItems().then((items) => {
      dispatch({
        type: PRUNE_CART,
        items,
      });
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Helmet>
          <title>JAMBO APPAREL</title>
        </Helmet>
        <AnnouncementHeader />
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/catalog/:id" component={ItemPage}></Route>
          <Route exact path="/catalog" component={CatalogPage}></Route>
          <Route exact path="/story" component={StoryPage}></Route>
          <Route exact path="/contact" component={ContactPage}></Route>
          <Route exact path="/cart" component={ShoppingCartPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/add-item" component={AddItemPage}></Route>
          <Route exact path="/edit-item/:id" component={EditItemPage}></Route>
          <Route exact path="/subscribers" component={SubscriberPage}></Route>
          <Route exact path="/success" component={SuccessPage}></Route>
          <Route exact path="/404" component={ErrorPage}></Route>
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
