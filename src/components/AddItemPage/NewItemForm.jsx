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
import Dropdown from "../styled/Dropdown";

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

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 40%;
`;

const ItemPreviewWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 60%;

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

  ${({ hasError }) =>
    hasError &&
    `
    border: 2px solid red;
  `}
`;

const Error = styled.span`
  font-family: Righteous, sans-serif;
  font-style: normal;
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

  ${({ hasError }) =>
    hasError &&
    `
    &: after{
      content: "  -  Invalid";
      color: red;
    }
  `}
`;

const List = styled.li`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: black;
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
  const eligibleCountriesOptions = [
    {
      value: "",
      label: "All Countries",
    },
    {
      value: "CA",
      label: "Canada Only",
    },
    {
      value: "CA/US",
      label: "Canada and US",
    },
  ];

  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [isPrintifyItem, setIsPrintifyItem] = useState(
    props.item.isPrintifyItem
  );
  const [newItem, setNewItem] = useState(props.item);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (props.edit) {
      console.log(newItem);
      getItemById(props.item.id)
        .then((fetchedItem) => {
          console.log(props.item);
          setErrors([]);
          setNewItem(pruneItemColors(fetchedItem));
        })
        .catch((err) => {
          console.log(err);
          setErrors(["useEffect"]);
        });
    }
  }, []);

  const pruneItemColors = (item) => {
    let tempColors = [];
    item.images
      .filter((image) => {
        return item.colors.includes(image.color);
      })
      .forEach((image) => {
        if (!tempColors.includes(image.color)) {
          tempColors.push(image.color);
        }
      });

    return {
      ...item,
      colors: tempColors,
    };
  };

  const getArrayOfColours = () => {
    const arrOfColours = newItem.colors;
    var resultArr = ["None"];
    arrOfColours.forEach((color) => {
      resultArr.push(color);
    });
    return resultArr;
  };

  const checkForErrors = () => {
    let newErrors = [];
    // Check for text input fields
    if (newItem.name.length === 0) {
      newErrors.push("name");
    }
    if (newItem.price.length === 0) {
      newErrors.push("price");
    }
    if (newItem.colors.length === 0) {
      newErrors.push("colors");
    }
    if (newItem.sizes.length === 0) {
      newErrors.push("sizes");
    }
    if (newItem.description.length === 0) {
      newErrors.push("description");
    }
    if (newItem.images.length === 0) {
      newErrors.push("images");
    }
    if (newItem.isPrintifyItem && newItem.printifyID.length === 0) {
      newErrors.push("printifyID");
    }
    if (!newItem.isPrintifyItem && newItem.shipping.length === 0) {
      newErrors.push("shipping");
    }
    if (
      !newItem.isPrintifyItem &&
      (newItem.increment.length === 0 || newItem.increment === 0)
    ) {
      newErrors.push("increment");
    }

    // Check image inputs
    if (newItem.images.filter((image) => image.color !== "None").length === 0) {
      newErrors.push("imageColors");
    }

    if (newErrors.length) {
      setErrors(newErrors);
    }

    console.log(newErrors);

    return newErrors;
  };

  const handleFormSubmit = (e) => {
    console.log(newItem);
    e.preventDefault();
    let tempNewItem = {
      ...newItem,
      thumbnailImage: newItem.images[0],
      tags: newItem.tags,
    };

    if (checkForErrors().length === 0) {
      tempNewItem = pruneItemColors(newItem);
      try {
        if (props.edit) {
          updateItemById(user, tempNewItem)
            .then((response) => {
              history.push({
                pathname: "/catalog",
                refresh: true,
              });
            })
            .catch((err) => alert(err));
        } else {
          getItems()
            .then((fetchedItems) => {
              tempNewItem = {
                ...tempNewItem,
                id:
                  Math.max.apply(
                    Math,
                    fetchedItems.map((item) => item.id)
                  ) + 1,
              };
              uploadItem(user, tempNewItem)
                .then((response) => {
                  history.push({
                    pathname: "/catalog",
                    refresh: true,
                  });
                })
                .catch((err) => alert(err));
            })
            .catch((err) => alert(err));
        }
      } catch (error) {
        setErrors(errors.concat(["form"]));
        alert(error);
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
        setErrors([]);
      })
      .catch((err) => {
        console.log(err);
        setErrors(errors.concat(["printifyID"]));
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

  const handleEligibleCountriesChange = (evt) => {
    setNewItem({
      ...newItem,
      eligibleCountries: evt.target.value,
    });
  };

  const handleIncrementChange = (evt) => {
    if (evt.target.value < 0) {
      evt.target.value = Math.abs(evt.target.value);
    } else if (evt.target.value > 100) {
      evt.target.value = 100;
    }
    setNewItem({
      ...newItem,
      increment: evt.target.value,
    });
  };

  const getUnchosenColors = (chosenColors) => {
    return newItem.colors.filter((color) => !chosenColors.includes(color));
  };

  const unchosenColors = getUnchosenColors(pruneItemColors(newItem).colors);

  const renderEligibleCountriesOptions = () => {
    return eligibleCountriesOptions.map((option) => (
      <option value={option.value}>{option.label}</option>
    ));
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

          <Label hasError={errors.includes("name")}>Item Name</Label>
          <Input
            label="Name"
            onChange={handleNameChange}
            value={newItem.name}
            placeholder="Bean"
            autocomplete="item-name"
            hasError={errors.includes("name")}
          />
          <Label hasError={errors.includes("price")}>Item Price</Label>
          <Input
            hasError={errors.includes("price")}
            label="Price"
            onChange={handlePriceChange}
            value={newItem.price}
            placeholder="xx.xx"
            autocomplete="item-price"
          />
          <Label hasError={errors.includes("colors")}>
            List of Colours (seperated by /)
          </Label>
          <Input
            hasError={errors.includes("colors")}
            label="List of colours"
            onChange={handleListofColoursChange}
            value={newItem.colors.join("/")}
            placeholder="Red/Green/Blue"
            autocomplete="list-of-colours"
          />
          <Label hasError={errors.includes("sizes")}>
            List of Sizes (seperated by /)
          </Label>
          <Input
            hasError={errors.includes("sizes")}
            label="List of sizes"
            onChange={handleListofSizesChange}
            value={newItem.sizes.join("/")}
            placeholder="S/M/L"
            autocomplete="list-of-sizes"
          />
          <Label hasError={errors.includes("description")}>Description</Label>
          <Input
            hasError={errors.includes("description")}
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
          <Label>Shipping Countries:</Label>
          <Dropdown
            value={newItem.eligibleCountries}
            onChange={handleEligibleCountriesChange}
          >
            {renderEligibleCountriesOptions()}
          </Dropdown>

          {!newItem.isPrintifyItem && (
            <RowWrapper style={{ width: "100%" }}>
              <ColumnWrapper>
                <Label hasError={errors.includes("shipping")}>Shipping:</Label>
                <Input
                  hasError={errors.includes("shipping")}
                  label="shipping"
                  onChange={handleShippingChange}
                  value={newItem.shipping}
                  placeholder="2.00"
                  autocomplete="shipping"
                  style={{ width: "70%" }}
                />
              </ColumnWrapper>
              <ColumnWrapper>
                <Label hasError={errors.includes("increment")}>
                  Increment:
                </Label>
                <Input
                  hasError={false}
                  label="increment"
                  onChange={handleIncrementChange}
                  value={newItem.increment}
                  type="number"
                  pattern="[0-9]"
                  min="1"
                  autocomplete="increment"
                  style={{ width: "70%" }}
                />
              </ColumnWrapper>
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
          <Label hasError={errors.includes("images")}>Add images here:</Label>
          <ImageForm
            getArrayOfColours={getArrayOfColours}
            newItem={newItem}
            setNewItem={setNewItem}
            hasError={errors.includes("imageColors")}
          />
          {errors.length !== 0 && <Error>Please enter valid details!</Error>}
          {unchosenColors.length !== 0 && (
            <div>
              <Label style={{ width: "100%" }}>
                <strong>The following colors have not been assigned:</strong>{" "}
              </Label>
              {unchosenColors.map((color) => (
                <List>{color}</List>
              ))}
              <Label style={{ width: "100%", color: "red" }}>
                Upon creating the item, these will be removed if not assigned
              </Label>
            </div>
          )}
          <Button>{props.edit ? "UPDATE ITEM" : "CREATE ITEM"}</Button>
        </Form>
      </FormWrapper>

      <ItemPreviewWrapper>
        <ItemPreview item={newItem} editPage={true} />
      </ItemPreviewWrapper>
    </Wrapper>
  );
};

export default NewItemForm;
