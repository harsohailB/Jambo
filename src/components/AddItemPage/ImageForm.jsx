import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown";
import { FaPlusCircle, FaTrash, FaImage } from "react-icons/fa";
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
    setNewItem({
      ...newItem,
      images: newItem.images.filter(
        (existingImage) => existingImage.imageLink !== image.imageLink
      ),
      thumbnailImage: { imageLink: placeHolderImageLink },
    });
  };

  const handleDropdownChange = (evt, image) => {
    setNewItem({
      ...newItem,
      images: newItem.images.map((img) => {
        if (image.imageLink === img.imageLink) {
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

  const handleMakeThumbnailClick = (image) => {
    let newThumbnail = newItem.images.find(
      (existingImage) => existingImage.imageLink === image.imageLink
    );
    let newItemImagesArray = newItem.images.filter(
      (existingImage) => existingImage.imageLink !== image.imageLink
    );

    newItemImagesArray.unshift(newThumbnail);

    setNewItem({
      ...newItem,
      images: newItemImagesArray,
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
        >
          {renderColourOptions()}
        </Dropdown>
        <Icon onClick={() => handleDeleteImageInput(image)}>
          <FaTrash size={18} />
        </Icon>
        <Tooltip title="Make Thumbnail" placement="right">
          <Icon onClick={() => handleMakeThumbnailClick(image)}>
            <FaImage size={18} />
          </Icon>
        </Tooltip>
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
