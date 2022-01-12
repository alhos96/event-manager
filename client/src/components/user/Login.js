import "./user.css";
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../navbar/Logo";
import { userLogin, messageReset } from "../../store/usersSlice";
import { changeHandler, onSubmit, methods } from "../../helpers";

function Login() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = methods;

  //global state
  const error = useSelector((state) => state.users.error);
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const token = sessionStorage.getItem("token");

  //local state
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    loggedIn && navigate("/dashboard");
  }, [loggedIn]);

  useEffect(() => {
    setFade(true);
  });

  return (
    <Box className="Login">
      <Logo />
      <Box component="form" onSubmit={(e) => onSubmit(e, dispatch, userLogin, "/users/login", userInput, post, token)}>
        {" "}
        <Fade in={fade} timeout={{ enter: 500 }} mountOnEnter unmountOnExit>
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
            name="password"
            label="Password"
            type="password"
            size="small"
            fullWidth
            required
          />
        </Fade>
        <br></br>
        <span className="error">{error}</span>
        <Fade in={fade} timeout={{ enter: 1500 }} mountOnEnter unmountOnExit>
          <Button sx={{ mt: 2 }} children="login" type="submit" size="small" variant="contained" fullWidth disableElevation />
        </Fade>
        <Fade in={fade} timeout={{ enter: 1700 }} mountOnEnter unmountOnExit>
          <Divider sx={{ mt: 1 }} />
        </Fade>
        <Fade in={fade} timeout={{ enter: 2200 }} mountOnEnter unmountOnExit>
          <Typography
            className="no-account-link"
            onClick={() => {
              navigate("/register");
              dispatch(messageReset());
            }}
            align="center"
            variant="body2"
          >
            Don't have account? <span className="link">Register!</span>
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
}

export default Login;
