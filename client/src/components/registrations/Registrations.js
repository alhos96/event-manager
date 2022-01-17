import "./registrations.css";
import { useState, useEffect } from "react";
import { Typography, Button, Box, ButtonGroup, Divider, Fade } from "@mui/material";
import { getSomething, methods, postSomething, colorSetter } from "../../helpers";
import Loader from "../Loader";
import moment from "moment";

function Registrations({ notification, setUrl }) {
  let token = sessionStorage.getItem("token");
  let { get, put } = methods;

  let [myEvents, setMyEvents] = useState([]);
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    getSomething(get, "/events/get-users-events", token, setMyEvents);
    setFade(true);
    // eslint-disable-next-line
  }, [notification, myEvents]);

  useEffect(() => {
    setFade(true);
    getSomething(get, "/events/get-users-events", token, setMyEvents);
    setUrl(window.location.pathname);
    return () => {
      setMyEvents([]);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box className="requests-wrapp">
      {myEvents.length > 0 ? (
        myEvents.map((event, index) => {
          let date = moment(event.date).format("DD.MM.YYYY.");

          return event.registrationRequests.map((request, index) => {
            return (
              <Fade key={index} in={fade} timeout={{ enter: 1000 }}>
                <Box className="request">
                  <Typography variant="body1" color="primary">
                    {event.title}
                  </Typography>
                  <Divider sx={{ mb: 1, mt: 1 }}></Divider>
                  <Box className="event-details">
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      <span className="small-title">Event Date:</span> {date}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      <span className="small-title">Event Price: </span> {event.price.toFixed(2)}KM
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      <span className="small-title">User Email:</span> {request.userWhoRegistered}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      <span className="small-title">Status:</span>{" "}
                      <span style={{ color: colorSetter(request.status) }}>{request.status}</span>
                    </Typography>
                  </Box>
                  <ButtonGroup disableElevation fullWidth>
                    <Button
                      id={event._id}
                      disabled={request.isAnswered}
                      onClick={(e) => {
                        postSomething(
                          put,
                          "/events/registration-answer",
                          { eventId: e.target.id, email: request.userWhoRegistered, answer: "Accepted" },
                          token,
                          setMyEvents
                        );
                      }}
                      variant="contained"
                    >
                      Accept
                    </Button>
                    <Button
                      id={event._id}
                      disabled={request.isAnswered}
                      onClick={(e) => {
                        postSomething(
                          put,
                          "/events/registration-answer",
                          { eventId: e.target.id, email: request.userWhoRegistered, answer: "Rejected" },
                          token,
                          setMyEvents
                        );
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Reject
                    </Button>
                  </ButtonGroup>
                </Box>
              </Fade>
            );
          });
        })
      ) : (
        <Loader message={"No registration requests"} timeout={3500} />
      )}
    </Box>
  );
}

export default Registrations;
