import styled from "styled-components"

const Button = styled.a`
  background-color: ${props =>
    props.variant === "outlined" ? "#fff" : props.buttonColor};
  color: ${props =>
    props.variant === "outlined" ? props.buttonColor : "#fff"};
  border: 1px solid ${props => props.buttonColor};
  border-radius: ${props => (props.variant === "outlined" ? "30px" : "4px")};
  padding: 15px 20px;
  cursor: pointer;
  box-shadow: none;
`

export default Button
