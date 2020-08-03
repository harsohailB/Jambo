import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
  text-align: center;
  max-height: 46px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Form;
