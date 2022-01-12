import "./navbar.css";
import { useState, useEffect } from "react";
import { Box, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

function Logo() {
  //helpers
  const navigate = useNavigate();

  //local state
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <Fade in={fade} timeout={{ enter: 500 }} mountOnEnter unmountOnExit>
      <Box className="Logo">
        <img
          onClick={() => {
            navigate("/dashboard");
          }}
          className="logo-image"
          src={logo}
          alt="logo"
        />
      </Box>
    </Fade>
  );
}

export default Logo;
