import styled from "styled-components";

const Dropdown = styled.select`
  padding: 10px 28px 10px 18px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: black;
  line-height: 1.5;
  border: 0 solid transparent;
  width: 100%;

  ${({ hasError }) =>
    hasError &&
    `
    border: 2px solid red;
  `}
`;

export default Dropdown;
