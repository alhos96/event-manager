import { useState, useEffect } from "react";
import "./assets/styles/App.css";
import { Box } from "@mui/material";
import { Navbar, Login, Register, CreateEvent, Dashboard, Registrations } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Notification from "./components/notification/Notification";

function App() {
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const loggedOut = useSelector((state) => state.users.loggedOut);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [url, setUrl] = useState(window.location.pathname);

  //side effects
  useEffect(() => {
    loggedIn && setToken(sessionStorage.getItem("token"));
  }, [loggedIn]);
  useEffect(() => {
    loggedOut && setToken(null);
  }, [loggedOut]);

  useEffect(() => {
    setSocket(io("http://localhost:5050"));
  }, []);

  useEffect(() => {
    socket?.on("aproveRegistration", (data) => {
      setDisplayNotification(true);
      setNotification(data);
    });
  }, [socket]);

  return (
    <Box className="App">
      <Notification notification={notification} displayNotification={displayNotification} setDisplayNotification={setDisplayNotification} />
      <BrowserRouter>
        {token && <Navbar socket={socket} url={url} />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard socket={socket} notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute>
                <CreateEvent socket={socket} setUrl={setUrl} />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard socket={socket} notification={notification} setUrl={setUrl} />
              </PrivateRoute>
            }
          />
          <Route
            path="/registrations"
            element={
              <PrivateRoute>
                <Registrations notification={notification} setUrl={setUrl} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
