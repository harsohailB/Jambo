import React, { useState, useContext } from "react";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid rgba(61, 66, 70, 0.85);
  background-color: #fff;
  width: 437px;
  border-radius: 2px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  padding: 10px 18px;
  width: 100%;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Icon = styled(Link)`
  margin: 10px;
  color: #3d4246;
  cursor: pointer;

  & :hover {
    color: #131516;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const PreviewImage = styled.img`
  width: 50px;
  height: auto;
  margin-right: 5px;
`;

const ImageForm = ({ getArrayOfColours, newItem, setNewItem }) => {
  const [id, setId] = useState(0);
  const placeHolderImageLink =
    "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";
  const [imageURL, setImageURL] = useState("");

  const renderColourOptions = () => {
    return getArrayOfColours().map((color) => <option>{color}</option>);
  };

  const handleAddImageInput = () => {
    newItem.images.push({
      id: id,
      color: "None",
      imageLink: placeHolderImageLink,
    });
    setId(id + 1);
  };

  const handleDeleteImageInput = (image) => {
    let tempImages = [];
    newItem.images.forEach((existingImage) => {
      if (existingImage.id !== image.id) {
        tempImages.push(existingImage);
      }
    });
    setNewItem({
      ...newItem,
      images: tempImages,
    });
  };

  const handleDropdownChange = (evt, image) => {
    setNewItem({
      ...newItem,
      images: newItem.images.map((img) => {
        if (image.id === img.id) {
          img = {
            ...img,
            color: evt.target.value,
          };
        }

        return img;
      }),
    });
  };

  const handleURLChange = (evt, image) => {
    setImageURL(evt.target.value.length === 0);

    const newImageLink =
      evt.target.value.length === 0 ? placeHolderImageLink : evt.target.value;

    setNewItem({
      ...newItem,
      thumbnailImage: {
        imageLink: newImageLink,
      },
      images: newItem.images.map((img) => {
        if (image.id === img.id) {
          img = {
            ...img,
            imageLink: newImageLink,
          };
        }
        return img;
      }),
    });
  };

  const renderImageInputs = () => {
    console.log(newItem.images);
    return newItem.images.map((image) => (
      <UploadWrapper id={image.id}>
        <PreviewImage src={image.imageLink} onError={placeHolderImageLink} />
        <Input
          placeholder="Image URL"
          onChange={(evt) => handleURLChange(evt, image)}
        ></Input>
        <Dropdown onChange={(evt) => handleDropdownChange(evt, image)}>
          {renderColourOptions()}
        </Dropdown>
        <Icon onClick={() => handleDeleteImageInput(image)}>
          <FaTrash size={18} />
        </Icon>
      </UploadWrapper>
    ));
  };

  return (
    <Wrapper>
      {renderImageInputs()}
      <Icon onClick={() => handleAddImageInput()}>
        <FaPlusCircle size={24} />
      </Icon>
    </Wrapper>
  );
};

export default ImageForm;
