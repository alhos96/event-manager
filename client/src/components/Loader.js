import { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Loader({ message, path, buttonText, timeout }) {
  const navigate = useNavigate();

  const [content, setContent] = useState(<CircularProgress />);

  useEffect(() => {
    let informationForUser = setTimeout(() => {
      setContent(
        <>
          <Typography>{message}</Typography>
          <br></br>
          {buttonText && (
            <Button
              onClick={() => {
                navigate(`${path}`);
              }}
            >
              {buttonText}
            </Button>
          )}
        </>
      );
    }, timeout);

    return () => {
      clearTimeout(informationForUser);
      setContent(<CircularProgress />);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      {content}
    </div>
  );
}

export default Loader;
