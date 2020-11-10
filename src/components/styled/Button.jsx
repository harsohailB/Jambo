import styled from "styled-components";
import { Link } from "react-router-dom";
import ButtonStyles from "./ButtonStyles";

const Button = styled(Link)`
  ${ButtonStyles}

  ${({ locked }) =>
    locked &&
    `
    background-color: #eee;

    &:hover {
      cursor: none;
    }
  `}
`;

export default Button;
