import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import styled from "styled-components";
import NewItemForm from "./NewItemForm"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AddItemPage = () => {
    const [user, setUser] = useContext(UserContext);

    return(
        <Wrapper>
            <NewItemForm/>
        </Wrapper>
    );
}

export default AddItemPage