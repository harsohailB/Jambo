import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

import ImageForm from "./ImageForm";
import {
  getItemById,
  getItems,
  updateItemById,
  uploadItem,
} from "../../actions/items";
import ItemPreview from "../ItemPage/ItemPreview";
import ButtonStyles from "../styled/ButtonStyles";
import { getPrintifyItemById } from "../../actions/printifyItems";
import PrintifyDropdown from "./PrintifyDropdown";

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

const RowWrapper = styled.div`
  display: flex;
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

const TopOptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewItemForm = (props) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [isPrintifyItem, setIsPrintifyItem] = useState(
    props.item.isPrintifyItem
  );
  const [newItem, setNewItem] = useState(props.item);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    if (props.edit) {
      console.log(newItem);
      getItemById(props.item.id)
        .then((fetchedItem) => {
          console.log(props.item);
          setNewItem(fetchedItem);
          setHasErrors(false);
        })
        .catch((err) => {
          console.log(err);
          setHasErrors(true);
        });
    }
  }, []);

  const getArrayOfColours = () => {
    const arrOfColours = newItem.colors;
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
      newItem.description === "" ||
      newItem.images.length === 0 ||
      (newItem.isPrintifyItem && newItem.printifyID.length === 0)
    ) {
      setHasErrors(true);
      return true;
    }

    // Check image inputs
    if (newItem.images.filter((image) => image.color !== "None").length === 0) {
      setHasErrors(true);
      return true;
    }

    return false;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let tempNewItem = {
      ...newItem,
      thumbnailImage: newItem.images[0],
      tags: newItem.tags,
    };
    console.log("newItem", tempNewItem);
    if (!checkForErrors()) {
      try {
        if (props.edit) {
          console.log(tempNewItem);
          updateItemById(user, tempNewItem);
        } else {
          getItems().then((fetchedItems) => {
            tempNewItem = {
              ...tempNewItem,
              id:
                Math.max.apply(
                  Math,
                  fetchedItems.map((item) => item.id)
                ) + 1,
            };
            uploadItem(user, tempNewItem);
          });
        }
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
      colors: evt.target.value.split("/"),
    });
  };

  const handleListofSizesChange = (evt) => {
    setNewItem({
      ...newItem,
      sizes: evt.target.value.split("/"),
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
      tags: evt.target.value.split("/"),
    });
  };

  const handlePrintifyIDChange = (evt) => {
    setNewItem({
      ...newItem,
      printifyID: evt.target.value,
    });
    getPrintifyItemById(user, evt.target.value)
      .then((fetchedPrintifyItem) => {
        setNewItem(fetchedPrintifyItem);
        setHasErrors(false);
      })
      .catch((err) => {
        console.log(err);
        setHasErrors(true);
      });
  };

  const handleFeatureClick = () => {
    setNewItem({
      ...newItem,
      featured: !newItem.featured,
    });
  };

  const handleOptionClick = (isPrintifyOption) => {
    setIsPrintifyItem(isPrintifyOption);
    setNewItem(props.item);
  };

  const handleSyncWithPrintifyClick = () => {
    getPrintifyItemById(user, newItem.printifyID).then(
      (fetchedPrintifyItem) => {
        setNewItem({
          ...fetchedPrintifyItem,
          id: newItem.id,
        });
      }
    );
  };

  const handleShippingChange = (evt) => {
    setNewItem({
      ...newItem,
      shipping: evt.target.value,
    });
  };

  const handleIncrementChange = (evt) => {
    if (evt.target.value < 1) {
      evt.target.value = 1;
    } else if (evt.target.value > 100) {
      evt.target.value = 100;
    }
    setNewItem({
      ...newItem,
      increment: evt.target.value,
    });
  };

  return (
    <Wrapper>
      <FormWrapper>
        {!props.edit && (
          <TopOptionsWrapper>
            <Button onClick={() => handleOptionClick(false)}>
              Custom Item
            </Button>
            <Button onClick={() => handleOptionClick(true)}>
              Printify Item
            </Button>
          </TopOptionsWrapper>
        )}

        {props.edit && newItem.isPrintifyItem && (
          <Button onClick={handleSyncWithPrintifyClick}>
            Sync with Printify Catalog
          </Button>
        )}

        <Form onSubmit={handleFormSubmit}>
          {isPrintifyItem && <Label>Select an item from Printify:</Label>}
          {isPrintifyItem && (
            <PrintifyDropdown newItem={newItem} setNewItem={setNewItem} />
          )}

          {isPrintifyItem && <Label>Printify ID</Label>}
          {isPrintifyItem && (
            <Input
              hasError={false}
              label="printifyID"
              onChange={handlePrintifyIDChange}
              value={newItem.printifyID}
              placeholder="PrintifyID"
              autocomplete="id"
            />
          )}

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
            value={newItem.colors.join("/")}
            placeholder="Red/Green/Blue"
            autocomplete="list-of-colours"
          />
          <Label>List of Sizes (seperated by /)</Label>
          <Input
            hasError={false}
            label="List of sizes"
            onChange={handleListofSizesChange}
            value={newItem.sizes.join("/")}
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
            value={newItem.tags.join("/")}
            placeholder="Accessories/Embroidery/Hats"
            autocomplete="tags"
          />

          {!newItem.isPrintifyItem && (
            <RowWrapper>
              <div>
                <Label>Shipping:</Label>
                <Input
                  hasError={false}
                  label="shipping"
                  onChange={handleShippingChange}
                  value={newItem.shipping}
                  placeholder="2.00"
                  autocomplete="shipping"
                  style={{ width: "40%" }}
                />
              </div>
              <div>
                <Label>Increment:</Label>
                <Input
                  hasError={false}
                  label="increment"
                  onChange={handleIncrementChange}
                  value={newItem.increment}
                  type="number"
                  pattern="[0-9]"
                  min="1"
                  autocomplete="increment"
                  style={{ width: "40%" }}
                />
              </div>
            </RowWrapper>
          )}

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
          <Button>{props.edit ? "UPDATE ITEM" : "CREATE ITEM"}</Button>
        </Form>
      </FormWrapper>

      <ItemPreviewWrapper>
        <ItemPreview item={newItem} />
      </ItemPreviewWrapper>
    </Wrapper>
  );
};

export default NewItemForm;
