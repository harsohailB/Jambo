import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import styled from "styled-components";
import logo from "./assets/logo.png";

const NavbarWrapper = styled.div`
    background-color: white;
    padding: 0 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PagesWrapper = styled.nav`
    display: flex:
    list-style: none;
`;

const PageReference = styled(Link)`
    display: flex;
    padding: 14px 16px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    cursor: pointer;
    text-decoration: none;

    &:hover{
        color: black;
    }
`; 

const LogoWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Logo = styled.img`
    max-width: 220px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const IconsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: fit-content;
`;

const Icon = styled.div`
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

const SearchBar = styled.input`
    border: 1px solid rgba(61,66,70,0.85);
    background-color: #fff;
    width: 200px;
    border-radius: 2px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    padding: 10px 18px;
`;

const Navbar = () => {
    const [searchClicked, setSearchClicked] = useState(false);

    const handleSearchClick = () => {
        setSearchClicked(!searchClicked);
    }

    return(
        <NavbarWrapper>
            <LogoWrapper>
                <Logo src={logo}></Logo>
            </LogoWrapper>

            <PagesWrapper>
                <PageReference to="/">Home</PageReference>
                <PageReference to="/catalog">Catalog</PageReference>
                <PageReference to="/story">Story</PageReference>
                <PageReference to="/contact">Contact</PageReference>
            </PagesWrapper>

            <IconsWrapper>
                {searchClicked && <SearchBar type="search" placeholder="Search"></SearchBar>}
                <Icon onClick={handleSearchClick}>
                    <FaSearch size={24}/>
                </Icon>    
                <Icon>
                    <FaShoppingCart size={24}/>
                </Icon>
            </IconsWrapper>
        </NavbarWrapper>
    );
}

export default Navbar