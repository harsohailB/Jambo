import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

import ImageForm from "./ImageForm";
import { uploadItem } from "../../actions/items";
import ItemPreview from "../ItemPage/ItemPreview";
import ButtonStyles from "../styled/ButtonStyles";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media (max-width: 1600px) {
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const FormWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 30%;
  padding-left: 10%;
`;

const ItemPreviewWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 70%;

  @media (max-width: 1600px) {
    width: 100%;
  }
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
  ${ButtonStyles}
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

const Icon = styled.div`
  margin: 5px;
  color: #557b97;
  cursor: pointer;
  width: -webkit-fit-content;
  height: -webkit-fit-content;

  & :hover {
    color: black;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const FeatureItemOption = styled.span`
  display: flex;
  align-items: center;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  color: #3d4246;
`;

const NewItemForm = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    colors: "",
    sizes: "",
    description: "",
    tags: "",
    featured: false,
    thumbnailImage: {
      imageLink:
        "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png",
    },
    images: [],
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

  const checkForErrors = () => {
    // Check for text input fields
    if (
      newItem.name === "" ||
      newItem.price === "" ||
      newItem.colors === "" ||
      newItem.sizes === "" ||
      newItem.description === ""
    ) {
      setHasErrors(true);
      return true;
    }

    // Check image inputs
    let result = false;
    newItem.images.forEach((image) => {
      if (image.file === null || image.imageName === "") {
        console.log("IN");
        setHasErrors(true);
        result = true;
      }
    });
    return result;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let tempNewItem = {
      ...newItem,
      thumbnailImage: newItem.images[0],
      tags: newItem.tags.split("/"),
    };
    console.log("handleFormSubmit -> tempNewItem", tempNewItem);
    if (!checkForErrors()) {
      try {
        uploadItem(user, tempNewItem);
        history.push("/catalog");
      } catch (error) {
        setHasErrors(true);
        console.log(error);
      }
    }
  };

  const handleNameChange = (evt) => {
    const input = evt.target.value;
    setNewItem({
      ...newItem,
      name: input,
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

  const handleTagsChange = (evt) => {
    setNewItem({
      ...newItem,
      tags: evt.target.value,
    });
  };

  const handleFeatureClick = () => {
    setNewItem({
      ...newItem,
      featured: !newItem.featured,
    });
  };

  return (
    <Wrapper>
      <FormWrapper>
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
          <Label>Tags (case sensitive)</Label>
          <Input
            hasError={false}
            label="tags"
            onChange={handleTagsChange}
            value={newItem.tags}
            placeholder="Accessories/Embroidery/Hats"
            autocomplete="tags"
          />
          <FeatureItemOption onClick={handleFeatureClick}>
            <Icon>
              {newItem.featured ? (
                <FaCheckCircle size={24} />
              ) : (
                <FaRegCircle size={24} />
              )}
            </Icon>
            Featured Item
          </FeatureItemOption>
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
      </FormWrapper>

      <ItemPreviewWrapper>
        <ItemPreview item={newItem} />
      </ItemPreviewWrapper>
    </Wrapper>
  );
};

export default NewItemForm;
