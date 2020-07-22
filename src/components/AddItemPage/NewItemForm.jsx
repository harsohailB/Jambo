import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ImageForm from "./ImageForm";
import { uploadItem } from "../../actions/items";

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

const NewItemForm = () => {
  const user = useSelector((state) => state.user);
  const [newItem, setNewItem] = useState({
    name: "",
    folderName: "",
    price: "",
    colors: "",
    sizes: "",
    description: "",
    thumbnailImage: null,
    images: [
      {
        id: 0,
        color: "None",
        imageName: "",
        file: null,
      },
    ],
  });
  const [hasErrors, setHasErrors] = useState(false);

  const getArrayOfColours = () => {
    const arrOfColours = newItem.colors.split("/");
    var resultArr = ["None"];
    arrOfColours.forEach((color) => {
      resultArr.push(color);
    });
    return resultArr;
  };

  const getArrayOfSizes = () => {
    return newItem.sizes.split("/");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      uploadItem(user, newItem);
    } catch (error) {
      setHasErrors(true);
      console.log(error);
    }
  };

  const handleNameChange = (evt) => {
    const input = evt.target.value;
    setNewItem({
      ...newItem,
      name: input,
      folderName: input.toLowerCase().replace(" ", "-"),
    });
  };

  const handlePriceChange = (evt) => {
    setNewItem({
      ...newItem,
      price: evt.target.value,
    });
  };

  const handleListofColoursChange = (evt) => {
    setNewItem({
      ...newItem,
      colors: evt.target.value,
    });
  };

  const handleListofSizesChange = (evt) => {
    setNewItem({
      ...newItem,
      sizes: evt.target.value,
    });
  };

  const handleDescriptionChange = (evt) => {
    setNewItem({
      ...newItem,
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
        value={newItem.name}
        placeholder="Bean"
        autocomplete="item-name"
      />
      <Label>Item Price</Label>
      <Input
        hasError={false}
        label="Price"
        onChange={handlePriceChange}
        value={newItem.price}
        placeholder="xx.xx"
        autocomplete="item-price"
      />
      <Label>List of Colours (seperated by /)</Label>
      <Input
        hasError={false}
        label="List of colours"
        onChange={handleListofColoursChange}
        value={newItem.colors}
        placeholder="Red/Green/Blue"
        autocomplete="list-of-colours"
      />
      <Label>List of Sizes (seperated by /)</Label>
      <Input
        hasError={false}
        label="List of sizes"
        onChange={handleListofSizesChange}
        value={newItem.sizes}
        placeholder="S/M/L"
        autocomplete="list-of-sizes"
      />
      <Label>Description</Label>
      <Input
        hasError={false}
        label="description"
        onChange={handleDescriptionChange}
        value={newItem.description}
        placeholder="The item is ..."
        autocomplete="description"
      />
      <Label>Add images here:</Label>
      <Label>
        (Note: First Picture will be thumbnail and DON'T put spaces in
        filenames)
      </Label>
      <ImageForm
        getArrayOfColours={getArrayOfColours}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      {hasErrors && <Error>Please enter valid details!</Error>}
      <Button>CREATE ITEM</Button>
    </Form>
  );
};

export default NewItemForm;
