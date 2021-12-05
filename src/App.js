import React from "react";
import { IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import * as API from "./api";
import "./index.css";

const PageWrapper = styled.div`
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

const FormWrapper = styled.article`
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

const Recipient = ({ recipient, remove }) => (
  <RecipientWrapper>
    {recipient}
    <IconButton aria-label="delete" onClick={remove}>
      <DeleteIcon />
    </IconButton>
  </RecipientWrapper>
);

function App() {
  const [recipients, setRecipients] = React.useState([
    "sten_muchow@yahoo.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
    "sten.muchow@gmail.com",
  ]);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setEmailValid] = React.useState(true);

  const remove = (email) => {
    console.log("removing", email);
    const newList = recipients.filter((recipient) => recipient !== email);
    setRecipients(newList);
  };

  const save = async (e) => {
    e.preventDefault();
    if (checkEmail()) {
      const newList = recipients.concat([email]);
      setRecipients(newList);
      setEmail("");
      const res = await API.saveRecipient({
        alertMessage,
        recipients: newList,
      });
      console.log(res);
    }
  };

  const checkEmail = () => {
    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    setEmailValid(isEmailValid);
    return isEmailValid;
  };

  const testAlert = async () => {
    const res = await API.testAlert({ alertMessage, recipients });
    console.log(res);
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <h1>Email Alert</h1>

        <form onSubmit={save}>
          <div className="innerWrapper">
            <TextField
              required
              label="Alert Message"
              value={alertMessage}
              placeholder="Add Alert Message"
              onChange={(e) => setAlertMessage(e.target.value)}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Frequency</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="hourly"
                  control={<Radio />}
                  label="Hourly"
                />

                <FormControlLabel
                  value="daily"
                  control={<Radio />}
                  label="Daily"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Email Recipients"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={checkEmail}
              error={!isValidEmail}
              helperText={!isValidEmail ? "Invalid email" : ""}
            />

            <h4>Recipients</h4>

            <div className="recipients">
              {recipients.map((r, key) => (
                <Recipient key={key} recipient={r} remove={() => remove(r)} />
              ))}

              {recipients.length === 0 && <p>** Add a recipient **</p>}
            </div>
          </div>

          <footer>
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit" onClick={testAlert}>
                Test Alert
              </Button>
              <Button variant="outlined" type="submit">
                Save
              </Button>
            </Stack>
          </footer>
        </form>
      </FormWrapper>
    </PageWrapper>
  );
}

export default App;
