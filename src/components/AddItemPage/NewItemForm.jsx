import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import styled from "styled-components";
import ImageForm from "./ImageForm";

const Form = styled.form`
    display: flex;  
    flex-direction: column; 
    justify-content: center;
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid rgba(61,66,70,0.85);
    background-color: #fff;
    width: 437px;
    margin: 10px;
    border-radius: 2px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    padding: 10px 18px;
`;

const Error = styled.label`
    font-family: Righteous,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: red;
`;

const Button = styled.button`
    font-family: Righteous,sans-serif;
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
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    text-align: left;
    color: black;
    line-height: 1.5;
    max-width: 50%;
    margin-left: 10px;
`;

const NewItemForm = () => {
    const [user, setUser] = useContext(UserContext);
    const [newItem, setNewItem] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [listOfColours, setListOfColours] = useState("");
    const [listOfSizes, setListOfSizes] = useState("");
    const [description, setDescription] = useState("");
    const [hasErrors, setHasErrors] = useState(false);

    const getArrayOfColours = () => {
        const arrOfColours = listOfColours.split(',');
        var resultArr = ["None"];
        arrOfColours.forEach(color => {
            resultArr.push(color);
        });
        return resultArr;
    }
    
    const getArrayOfSizes = () => {
        return listOfSizes.split(',');
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setHasErrors(true);
    };

    const handleNameChange = evt => {
        setName(evt.target.value);
    }
    
    const handlePriceChange = evt => {
        setPrice(evt.target.value);
    }
    
    const handleListofColoursChange = evt => {
        setListOfColours(evt.target.value);
    }
    
    const handleListofSizesChange = evt => {
        setListOfSizes(evt.target.value);
    }
    
    const handleDescriptionChange = evt => {
        setDescription(evt.target.value);
    }

    return(
        <Form onSubmit={handleFormSubmit}>
                <Label>Item Name</Label>
                <Input
                    hasError={false}
                    label="Name"
                    handleInputChange={setName}
                    onChange={handleNameChange}
                    value={name}
                    placeholder="Bean"
                    autocomplete="item-name"
                />
                <Label>Item Price</Label>
                <Input
                    hasError={false}
                    label="Price"
                    handleInputChange={setPrice}
                    onChange={handlePriceChange}
                    value={price}
                    placeholder="xx.xx"
                    autocomplete="item-price"
                />
                <Label>List of Colours (seperated by commas)</Label>
                <Input
                    hasError={false}
                    label="List of colours"
                    handleInputChange={setListOfColours}
                    onChange={handleListofColoursChange}
                    value={listOfColours}
                    placeholder="Red,Green,Blue"
                    autocomplete="list-of-colours"
                />
                <Label>List of Sizes (seperated by commas)</Label>
                <Input
                    hasError={false}
                    label="List of sizes"
                    handleInputChange={setListOfSizes}
                    onChange={handleListofSizesChange}
                    value={listOfSizes}
                    placeholder="S,M,L"
                    autocomplete="list-of-sizes"
                />
                <Label>Description</Label>
                <Input
                    hasError={false}
                    label="description"
                    handleInputChange={setDescription}
                    onChange={handleDescriptionChange}
                    value={description}
                    placeholder="The item is ..."
                    autocomplete="description"
                />
                <ImageForm getArrayOfColours={getArrayOfColours}/>
                {hasErrors && <Error>Please enter valid details!</Error>}
                <Button>CREATE ITEM</Button>
            </Form>
    );
}

export default NewItemForm