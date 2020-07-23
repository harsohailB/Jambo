import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getItemById, updateItemById } from "../../actions/items";
import { useEffect } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid rgba(61, 66, 70, 0.85);
  background-color: #fff;
  width: 437px;
  margin: 10px;
  border-radius: 2px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  padding: 10px 18px;
`;

const Error = styled.label`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: red;
`;

const Button = styled.button`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  padding: 10px 18px;
  display: inline-block;
  width: auto;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 8px 15px;
  background-color: #557b97;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 14px;
  margin: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  color: black;
  line-height: 1.5;
  max-width: 50%;
  margin-left: 10px;
`;

const EditItemForm = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [item, setItem] = useState({});
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    try {
      const itemId = location.pathname.split("/").reverse()[0];
      getItemById(itemId).then((fetchedItem) => {
        setItem(fetchedItem);
      });
    } catch (e) {
      console.log("EditItemPage UseEffect ERROR");
      console.log(e);
    }
  }, [location]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateItemById(user, item);
    history.push("/catalog/" + item.id);
  };

  const handleNameChange = (evt) => {
    setItem({
      ...item,
      name: evt.target.value,
    });
    console.log(item);
  };

  const handlePriceChange = (evt) => {
    setItem({
      ...item,
      price: evt.target.value,
    });
  };

  const handleListofColoursChange = (evt) => {
    setItem({
      ...item,
      colors: evt.target.value,
    });
  };

  const handleListofSizesChange = (evt) => {
    setItem({
      ...item,
      sizes: evt.target.value,
    });
  };

  const handleDescriptionChange = (evt) => {
    setItem({
      ...item,
      description: evt.target.value,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Label>Item Name</Label>
      <Input
        hasError={false}
        label="Name"
        onChange={handleNameChange}
        value={item.name}
        placeholder="Bean"
        autocomplete="item-name"
      />
      <Label>Item Price</Label>
      <Input
        hasError={false}
        label="Price"
        onChange={handlePriceChange}
        value={item.price}
        placeholder="xx.xx"
        autocomplete="item-price"
      />
      <Label>List of Colours (seperated by /)</Label>
      <Input
        hasError={false}
        label="List of colours"
        onChange={handleListofColoursChange}
        value={item.colors}
        placeholder="Red,Green,Blue"
        autocomplete="list-of-colours"
      />
      <Label>List of Sizes (seperated by /)</Label>
      <Input
        hasError={false}
        label="List of sizes"
        onChange={handleListofSizesChange}
        value={item.sizes}
        placeholder="S,M,L"
        autocomplete="list-of-sizes"
      />
      <Label>Description</Label>
      <Input
        hasError={false}
        label="description"
        onChange={handleDescriptionChange}
        value={item.description}
        placeholder="The item is ..."
        autocomplete="description"
      />
      {hasErrors && <Error>Please enter valid details!</Error>}
      <Button>SAVE CHANGES</Button>
    </Form>
  );
};

export default EditItemForm;
