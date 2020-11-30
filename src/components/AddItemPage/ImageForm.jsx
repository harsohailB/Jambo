import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown";
import {
  FaPlusCircle,
  FaTrash,
  FaImage,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

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

const Error = styled.span`
  font-family: Righteous, sans-serif;
  font-style: normal;
  color: red;
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
  color: #cfcfcf;
  transition: all 0.5s ease;

  & :hover {
    transition: all 0.5s ease;
    cursor: pointer;
    color: #131516;
  }
`;

const PreviewImage = styled.img`
  width: 50px;
  height: auto;
  margin-right: 5px;
`;

const ImageForm = ({ getArrayOfColours, newItem, setNewItem, hasError }) => {
  const [id, setId] = useState(0);
  const placeHolderImageLink =
    "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

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
    let tempNewItem = {
      ...newItem,
      images: newItem.images.filter(
        (existingImage) =>
          newItem.images.indexOf(existingImage) !==
          newItem.images.indexOf(image)
      ),
    };

    setNewItem({
      ...tempNewItem,
      thumbnailImage: tempNewItem.images.length
        ? tempNewItem.images[0]
        : { imageLink: placeHolderImageLink },
    });
  };

  const handleDropdownChange = (evt, image) => {
    setNewItem({
      ...newItem,
      images: newItem.images.map((img) => {
        if (newItem.images.indexOf(image) === newItem.images.indexOf(img)) {
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
    const newImageLink =
      evt.target.value.length === 0 ? placeHolderImageLink : evt.target.value;

    setNewItem({
      ...newItem,
      thumbnailImage: {
        imageLink: newImageLink,
      },
      images: newItem.images.map((img) => {
        if (newItem.images.indexOf(image) === newItem.images.indexOf(img)) {
          img = {
            ...img,
            imageLink: newImageLink,
          };
        }
        return img;
      }),
    });
  };

  const handleMoveImage = (image, inUpDirection) => {
    const currIndex = newItem.images.indexOf(image);
    if (inUpDirection && currIndex === 0) return;
    if (!inUpDirection && currIndex === newItem.images.length - 1) return;

    let imgArr = newItem.images;
    let tempImg;
    if (inUpDirection) {
      tempImg = imgArr[currIndex - 1];
      imgArr[currIndex - 1] = image;
      imgArr[currIndex] = tempImg;
    } else {
      tempImg = imgArr[currIndex + 1];
      imgArr[currIndex + 1] = image;
      imgArr[currIndex] = tempImg;
    }

    setNewItem({
      ...newItem,
      images: imgArr,
    });
  };

  const renderImageInputs = () => {
    return newItem.images.map((image) => (
      <UploadWrapper id={image.id}>
        <PreviewImage src={image.imageLink} onError={placeHolderImageLink} />
        <Input
          placeholder="Image URL"
          value={image.imageLink}
          onChange={(evt) => handleURLChange(evt, image)}
        ></Input>
        <Dropdown
          value={image.color}
          onChange={(evt) => handleDropdownChange(evt, image)}
          hasError={hasError}
        >
          {renderColourOptions()}
        </Dropdown>
        <Icon onClick={() => handleDeleteImageInput(image)}>
          <FaTrash size={18} />
        </Icon>
        <Icon onClick={() => handleMoveImage(image, true)}>
          <FaArrowUp size={18} />
        </Icon>
        <Icon onClick={() => handleMoveImage(image, false)}>
          <FaArrowDown size={18} />
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
