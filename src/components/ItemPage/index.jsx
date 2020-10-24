import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ItemPreview from "./ItemPreview";

import Title from "../styled/Title";
import { getItemById } from "../../actions/items";

const ItemPage = () => {
  const location = useLocation();
  const history = useHistory();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const itemId = location.pathname.split("/").reverse()[0];
    getItemById(itemId)
      .then((fetchedItem) => {
        setItem(fetchedItem);
      })
      .catch((error) => {
        history.push("/404");
      });
  }, [location]);

  return (
    <div>{item ? <ItemPreview item={item} /> : <Title>Loading...</Title>}</div>
  );
};

export default ItemPage;
