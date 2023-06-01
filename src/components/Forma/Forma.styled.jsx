import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Label = styled.label`
  color: blue;
`
export const Input = styled.input`
  padding: 10px;
  width: 350px;
  color: blue;
  border-color: blue;
  border-radius: 5px;
`
export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  padding: 5px 10px 5px;
  margin-top: 20px;

  background: rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  &:hover{
  color: red;
  background-color: #000;
  cursor: pointer;
  }
`
export const Span = styled.span`
display: flex;
justify-content:center;
`
