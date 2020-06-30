import React from "react";
import Title from "../styled/Title"
import Button from "../styled/Button"
import Form from "../styled/Form"
import Input from "../styled/Input"

const SearchPage = () => {
    return(
        <div>
            <Title>SEARCH OUR SITE</Title>
            <Form>
                <Input type="search" placeholder="Search"></Input>
                <Button>SUBMIT</Button>
            </Form>
        </div>
    );
}

export default SearchPage