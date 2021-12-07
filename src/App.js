import React from "react";
import { TextField, CircularProgress } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Recipient, PageWrapper, FormWrapper } from "./components";
import * as API from "./api";
import "./index.css";

function App() {
  const [recipients, setRecipients] = React.useState([
    "sten_muchow@yahoo.com",
    "sten.muchow@gmail.com",
  ]);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [frequency, setFrequency] = React.useState("hourly");
  const [helperText, setHelperText] = React.useState("");
  const [hasError, setError] = React.useState(false);
  const [isAction, setAction] = React.useState(false);

  const remove = (email) => {
    const newList = recipients.filter((recipient) => recipient !== email);
    setRecipients(newList);
  };

  const submit = (e) => {
    const submitter = e?.nativeEvent?.submitter?.innerText;
    if (submitter === "TEST ALERT") {
      testAlert();
    }

    if (submitter === "SAVE") {
      save();
    }

    //stop page reload
    e.preventDefault();
  };

  const save = async () => {
    if (!email) {
      setError(true);
      return setHelperText("Add an email.");
    }

    if (checkIsEmail() && !isDuplicate()) {
      setAction(true);
      setError(false);
      setHelperText("");
      const newList = recipients.concat([email]);
      setRecipients(newList);
      setEmail("");
      const res = await API.saveRecipient({
        alertMessage,
        recipients: newList,
        frequency,
      });
      console.log(res);
      setTimeout(() => {
        setAction(false);
      }, 500);
    }
  };

  const isDuplicate = () => {
    const isDuplicate = recipients.indexOf(email) !== -1;
    if (isDuplicate) {
      setError(true);
      setHelperText("Email already exists.");
    } else {
      setError(false);
      setHelperText("");
    }
    return isDuplicate;
  };

  const checkIsEmail = () => {
    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    if (email && !isEmailValid) {
      setError(true);
      setHelperText("Invalid Email");
    } else {
      setError(false);
      setHelperText("");
    }
    return isEmailValid;
  };

  const testAlert = async () => {
    setAction(true);
    const res = await API.testAlert({ alertMessage, recipients, frequency });
    console.log(res);
    setTimeout(() => {
      setAction(false);
    }, 500);
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <h1>Email Alert</h1>

        <form onSubmit={submit}>
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
                aria-label="frequency"
                name="row-radio-buttons-group"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
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
              onBlur={() => {
                checkIsEmail() && isDuplicate();
              }}
              error={hasError}
              helperText={helperText}
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
            <Stack spacing={2} direction="row" alignItems="center">
              <Button variant="contained" type="submit">
                Test Alert
              </Button>
              <Button variant="outlined" type="submit">
                Save
              </Button>
              {isAction && <CircularProgress size={20} />}
            </Stack>
          </footer>
        </form>
      </FormWrapper>
    </PageWrapper>
  );
}

export default App;
