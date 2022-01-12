import "./user.css";
import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../navbar/Logo";
import { changeHandler, onSubmit, methods } from "../../helpers";
import { userRegister, messageReset } from "../../store/usersSlice";

function Register() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post } = methods;

  //global state
  const error = useSelector((state) => state.users.error);
  const isRegistered = useSelector((state) => state.users.registered);

  //local state
  const [userInput, setUserInput] = useState({ email: "", firstname: "", lastname: "", password: "", confirmPasword: "" });
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    isRegistered && navigate("/login");
  }, [isRegistered]);

  useEffect(() => {
    setFade(true);
  });

  return (
    <Box className="Register">
      <Logo />
      <Box component="form" onSubmit={(e) => onSubmit(e, dispatch, userRegister, "/users/register", userInput, post)}>
        <Fade in={fade} timeout={{ enter: 1500 }} mountOnEnter unmountOnExit>
          <TextField
            sx={{ mt: 1 }}
            onChange={(e) => changeHandler(e, userInput, setUserInput)}
            name="email"
            label="Email"
            type="text"
            size="small"
            fullWidth
            required
          />
        </Fade>
        <br></br>
        <Fade in={fade} timeout={{ enter: 1000 }} mountOnEnter unmountOnExit>
          <TextField
            sx={{ mt: 1 }}
            onChange={(e) => changeHandler(e, userInput, setUserInput)}
            name="firstname"
            label="First Name"
            type="text"
            size="small"
            fullWidth
            required
          />
        </Fade>
        <br></br>
        <Fade in={fade} timeout={{ enter: 1000 }} mountOnEnter unmountOnExit>
          <TextField
            sx={{ mt: 1 }}
            onChange={(e) => changeHandler(e, userInput, setUserInput)}
            name="lastname"
            label="Last Name"
            type="text"
            size="small"
            fullWidth
            required
          />
        </Fade>
        <br></br>

        <Fade in={fade} timeout={{ enter: 2000 }} mountOnEnter unmountOnExit>
          <TextField
            sx={{ mt: 1 }}
            onChange={(e) => changeHandler(e, userInput, setUserInput)}
            name="password"
            label="Password"
            type="password"
            size="small"
            fullWidth
            required
          />
        </Fade>
        <br></br>
        <Fade in={fade} timeout={{ enter: 2500 }} mountOnEnter unmountOnExit>
          <TextField
            sx={{ mt: 1 }}
            onChange={(e) => changeHandler(e, userInput, setUserInput)}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            size="small"
            fullWidth
            required
          />
        </Fade>
        <br></br>
        <span className="error">{error}</span>
        <Fade in={fade} timeout={{ enter: 3000 }} mountOnEnter unmountOnExit>
          <Button sx={{ mt: 2 }} size="small" variant="contained" type="submit" children="register" fullWidth disableElevation />
        </Fade>
        <Fade in={fade} timeout={{ enter: 3500 }} mountOnEnter unmountOnExit>
          <Divider sx={{ mt: 1 }} />
        </Fade>
        <Fade in={fade} timeout={{ enter: 4000 }} mountOnEnter unmountOnExit>
          <Typography
            className="no-account-link"
            onClick={() => {
              navigate("/login");
              dispatch(messageReset());
            }}
            align="center"
            variant="body2"
          >
            Already have account? <span className="link">Login!</span>
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
}

export default Register;
