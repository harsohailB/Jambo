import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import styled from "styled-components";
import NewItemForm from "./NewItemForm";
import Title from "../styled/Title";

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
            {user ? <NewItemForm/> : <Title>You're not supposed to be here!</Title>}
        </Wrapper>
    );
}

export default AddItemPage