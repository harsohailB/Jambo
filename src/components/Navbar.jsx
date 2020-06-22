import React from "react";
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import styled from "styled-components";
import logo from "../assets/logo.png";

const NavbarWrapper = styled.div`
    background-color: white;
    padding: 0 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PagesWrapper = styled.div`
    display: flex:
    list-style: none;
    width: fit-content;
`;

const PageReference = styled.li`
    display: flex;
    padding: 14px 16px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    cursor: pointer;
`; 

const Logo = styled.img`
    max-width: 220px;
`;

const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    width: fit-content;
`;

const Icon = styled.div`
    margin: 10px;
  color: ${({ hoverColor, enabled }) => (enabled ? hoverColor : "#3d4246;")};
  cursor: pointer;
  & :hover {
    color: ${({ hoverColor }) => hoverColor || "#131516"};
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const Navbar = () => {
    return(
        <NavbarWrapper>
            <Logo src={logo}></Logo>

            <PagesWrapper>
                <PageReference>Home</PageReference>
                <PageReference>Catalog</PageReference>
                <PageReference>Story</PageReference>
                <PageReference>Contact</PageReference>
            </PagesWrapper>

            <Icons>
                <Icon>
                    <FaSearch size={24}/>
                </Icon>    
                <Icon>
                    <FaShoppingCart size={24}/>
                </Icon>
            </Icons>
        </NavbarWrapper>
    );
}

export default Navbar