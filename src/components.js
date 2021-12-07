import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  * {
    box-sizing: border-box;
    &::after {
      box-sizing: border-box;
    }
    &::before {
      box-sizing: border-box;
    }
  }
`;

export const FormWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 600px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;

  h4 {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 80%;
    .innerWrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .MuiTextField-root {
      margin: 15px 0;
    }
    .recipients {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 10px 0;
      overflow-x: auto;
      min-height: 190px;
    }

    footer {
      margin-top: 10px;
      min-height: 70px;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    border: none;
    padding-bottom: 120px;

    form {
      padding: 0;
      height: 100%;
    }

    footer {
      background: white;
      padding: 10px;
      border-radius: 6px;
      border-top: 1px solid #ccc;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -5px;
    }
  }
`;

const RecipientWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc; ;
`;

export const Recipient = ({ recipient, remove }) => (
  <RecipientWrapper>
    {recipient}
    <IconButton aria-label="delete" onClick={remove}>
      <DeleteIcon />
    </IconButton>
  </RecipientWrapper>
);
