import React, { useState, useContext } from "react";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown";
import { FaPlusCircle } from 'react-icons/fa';
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

const ImageInput = styled.input`
    
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

const ImageForm = ({ getArrayOfColours }) => {
    const [images, setImages] = useState([{
        imageName: "",
        color: "None"
    }]);
    
    

    const renderColourOptions = () => {
        return getArrayOfColours().map(color => (
            <option>{color}</option>
        ));
    }

    const handleAddImageInput = () => {
        images.push({
            imageName: "",
            color: "None"
        });
    }

    const handleDropdownChange = (evt, image) => {
        image = {
            ...image,
            color: evt.target.value
        }
        console.log(image);
    }

    const handleFileSelected = (evt, image) => {
        image = {
            ...image,
            imageName: evt.target.files[0].name
        }
        console.log(image);
    }

    const renderImageInputs = () => {
        return images.map(image => (
            <UploadWrapper>
                <ImageInput type="file" accept="image/jpeg,image/jpg" onChange={evt => handleFileSelected(evt, image)}></ImageInput>
                <Dropdown onChange={evt => handleDropdownChange(evt, image)}>
                    {renderColourOptions()}
                </Dropdown>
            </UploadWrapper>
        ));            
    }

    return(
        <Wrapper>
            {renderImageInputs()}
            <Icon onClick={handleAddImageInput}>
                <FaPlusCircle size={24}/>
            </Icon>
        </Wrapper>
    );
}

export default ImageForm