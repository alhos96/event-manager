import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./actions";

const slice = createSlice({
  initialState: {
    loggedIn: false,
    loggedOut: false,
    registered: false,
    user: {
      name: "",
      email: "",
    },
    error: "",
    message: "",
  },
  name: "users",
  reducers: {
    userLoggedIn: (users, { payload }) => {
      users.loggedIn = true;
      users.loggedOut = false;
      users.error = "";
      users.message = "";
      users.user.name = payload.data.firstname;
      users.user.email = payload.data.email;
      sessionStorage.setItem("token", payload.data.token);
      sessionStorage.setItem("user", payload.data.name);
      sessionStorage.setItem("email", payload.data.email);
    },
    userRegistered: (users, { payload }) => {
      users.registered = true;
      users.error = "";
      users.message = "";
    },

    gotUserInfo: (users, { payload }) => {
      users.user.name = payload.data.firstname;
      users.user.email = payload.data.email;
    },
    userLoggedOut: (users, { payload }) => {
      users.loggedIn = false;
      users.loggedOut = true;
      users.user = {
        name: "",
        email: "",
      };

      sessionStorage.clear();
    },
    messageReset: (users, { payload }) => {
      users.message = "";
      users.error = "";
      users.registered = false;
    },
    gotError: (users, { payload }) => {
      users.error = payload;
    },
  },
});

export const userLogin = (url, userInput, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      userInput,
      method,
      token,
      onSuccess: userLoggedIn.type,
      onError: gotError.type,
    })
  );
};

export const userRegister = (url, userInput, method, token) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      userInput,
      method,
      token,
      onSuccess: userRegistered.type,
      onError: gotError.type,
    })
  );
};

export const { userLoggedIn, userRegistered, userLoggedOut, gotError, messageReset } = slice.actions;
export default slice.reducer;
