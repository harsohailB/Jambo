import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaDoorOpen, FaBars } from "react-icons/fa";
import styled from "styled-components";
import logo from "./assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_USER } from "./actions/types";
import { useWindowResize } from "beautiful-react-hooks";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarWrapper = styled.div`
  background-color: white;
  padding: 0 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PagesWrapper = styled.nav`
  position: absolute;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const PageReference = styled(Link)`
  display: flex;
  padding: 14px 16px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: black;
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  justify-content: flex-start;
`;

const Logo = styled.img`
  width: 220px;
  height: 71px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
`;

const cartColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Icon = styled(Link)`
  margin: 10px;
  padding: 0px 0px 0px 0px;
  color: #3d4246;
  cursor: pointer;

  & :hover {
    color: #131516;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const IconForCart = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  padding: 0px 0px 0px 0px;
  color: #3d4246;
  cursor: pointer;

  & :hover {
    color: #131516;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const CartCounter = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: orange;
  position: absolute;
  float: left;
  z-index: 1000;
  font-size: 12px;
  margin: 10px 0px 27px 12px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SearchBar = styled.input`
  border: 1px solid rgba(61, 66, 70, 0.85);
  background-color: #fff;
  border-radius: 2px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  padding: 10px 18px;
  transition: all 0.5s;

  @media (max-width: 768px) {
    left: ;
  }
`;

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [menuClicked, setMenuClicked] = useState(false);
  useWindowResize((event: React.SyntheticEvent) => {
    setIsMobile(window.innerWidth < 800);
    if (!isMobile) {
      setMenuClicked(false);
    }
  });

  const user = useSelector((state) => state.user);
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchClicked && searchInput.length !== 0) {
      setSearchClicked(false);
      history.push({
        pathname: "/catalog",
        data: searchInput,
      });
    } else {
      setSearchClicked(!searchClicked);
    }
  };

  const handleSearchInputChange = (evt) => {
    setSearchInput(evt.target.value);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: LOGOUT_USER });
    history.push("/");
  };

  const getCartItemCount = () => {
    let count = 0;
    shoppingCartItems.forEach((item) => {
      count += +item.quantity;
    });
    return count;
  };

  const handleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <Wrapper>
      <NavbarWrapper>
        <LogoWrapper to="/">
          <Logo src={logo}></Logo>
        </LogoWrapper>

        {!isMobile && (
          <PagesWrapper>
            <PageReference to="/">Home</PageReference>
            <PageReference to="/catalog">Catalog</PageReference>
            <PageReference to="/story">Story</PageReference>
            <PageReference to="/contact">Contact</PageReference>
          </PagesWrapper>
        )}

        <IconsWrapper>
          {searchClicked && !isMobile && (
            <motion.div
              initial={{ width: "0px" }}
              animate={{ width: ["0px", "200px", "175px"] }}
              transition={{ duration: 0.7, times: [0, 0.5, 0.7] }}
            >
              <form onSubmit={handleSearchClick}>
                <SearchBar
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                ></SearchBar>
              </form>
            </motion.div>
          )}
          <Icon onClick={handleSearchClick}>
            <FaSearch size={24} />
          </Icon>
          <IconForCart to="/cart">
            {shoppingCartItems.length !== 0 && (
              <CartCounter>{getCartItemCount()}</CartCounter>
            )}
            <FaShoppingCart size={24} />
          </IconForCart>
          {user && (
            <Icon onClick={handleLogout}>
              <FaDoorOpen size={24} />
            </Icon>
          )}
          {isMobile && (
            <Icon onClick={handleMenuClick}>
              <FaBars size={24} />
            </Icon>
          )}
        </IconsWrapper>
      </NavbarWrapper>

      {searchClicked && isMobile && (
        <PagesWrapper>
          <motion.div
            initial={{ height: "0px" }}
            animate={{ height: ["0px", "100px", "60px"] }}
            transition={{ duration: 0.7, times: [0, 0.5, 0.7] }}
          >
            <form onSubmit={handleSearchClick}>
              <SearchBar
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
              ></SearchBar>
            </form>
          </motion.div>
        </PagesWrapper>
      )}

      {menuClicked && (
        <motion.div
          initial={{ height: "0px" }}
          animate={{ height: ["0px", "240px", "220px"] }}
          transition={{ duration: 0.7, times: [0, 0.5, 0.7] }}
        >
          <PagesWrapper>
            <PageReference onClick={() => setMenuClicked(false)} to="/">
              Home
            </PageReference>
            <PageReference onClick={() => setMenuClicked(false)} to="/catalog">
              Catalog
            </PageReference>
            <PageReference onClick={() => setMenuClicked(false)} to="/story">
              Story
            </PageReference>
            <PageReference onClick={() => setMenuClicked(false)} to="/contact">
              Contact
            </PageReference>
          </PagesWrapper>
        </motion.div>
      )}
    </Wrapper>
  );
};

export default Navbar;
