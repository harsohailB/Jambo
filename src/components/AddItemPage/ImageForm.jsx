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

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-grow: 2;
`;

const ImageInput = styled.input``;

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

const ImageForm = ({ getArrayOfColours, newItem, setNewItem }) => {
  const [id, setId] = useState(1);

  const renderColourOptions = () => {
    return getArrayOfColours().map((color) => <option>{color}</option>);
  };

  const handleAddImageInput = () => {
    newItem.images.push({
      id: id,
      color: "None",
      file: null,
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
    image = {
      ...image,
      color: evt.target.value,
    };
    newItem.images.pop();
    newItem.images.push(image);
  };

  const handleFileSelected = (evt, image) => {
    image = {
      ...image,
      imageName: evt.target.files[0].name,
      file: evt.target.files[0],
    };
    newItem.images.pop();
    if (newItem.images.length === 0) {
      setNewItem({ ...newItem, thumbnailImage: image });
    }
    newItem.images.push(image);
  };

  const renderImageInputs = () => {
    return newItem.images.map((image) => (
      <UploadWrapper>
        <ImageInput
          type="file"
          accept="image/jpeg,image/jpg"
          onChange={(evt) => handleFileSelected(evt, image)}
        ></ImageInput>
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
