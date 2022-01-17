import "./dashboard.css";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Box, ButtonGroup, Fade } from "@mui/material";
import moment from "moment";
import { filters, getSomething, methods, postSomething } from "../../helpers";
import Loader from "../Loader";
import axios from "axios";
import Notification from "../notification/Notification";

function Dashboard({ socket, notification, setUrl }) {
  //helpers
  const { get, remove, patch } = methods;

  //global state
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");

  //local state
  const [events, setEvents] = useState([]);
  const [eventsCreated, setEventsCreated] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All Events");
  const [fade, setFade] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [message, setMessage] = useState("");

  //side effects

  useEffect(() => {
    getSomething(get, "/events/get-events", token, setEvents);
    setFade(true);

    // eslint-disable-next-line
  }, [eventsCreated, events, notification]);

  useEffect(() => {
    socket?.on("recieveEvent", (data) => {
      setEventsCreated((prev) => [...prev, data]);
    });
    return () => {
      setEventsCreated([]);
    };
  }, [socket]);

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);

  return (
    <Box className="Dashboard">
      <Notification
        message={message}
        setMessage={setMessage}
        displayNotification={displayNotification}
        setDisplayNotification={setDisplayNotification}
      />
      {events.length > 0 && (
        <Fade in={fade} timeout={{ enter: 500 }}>
          <Box className="Filters">
            {filters.map((filter, index) => {
              return (
                <Typography
                  onClick={(e) => {
                    setFilterCategory(e.target.id);
                  }}
                  id={filter}
                  className="link-identifier nav-link"
                  variant="body2"
                  color="primary"
                  key={index}
                >
                  {filter}
                </Typography>
              );
            })}
          </Box>
        </Fade>
      )}
      <Box className="event-cards-wrapp">
        {events.length > 0 ? (
          events
            // eslint-disable-next-line
            .filter((event) => {
              if (filterCategory === "All Events") {
                return event;
              }
              if (filterCategory === event.category) {
                return event;
              }
              if (filterCategory === "My Events" && event.creator === user) {
                return event;
              }
            })
            .map((event, index) => {
              let date = moment(event.date).format("DD.MM.YYYY.");
              return (
                <Fade key={index} in={fade} timeout={{ enter: 500 }}>
                  <div className="card-wrapp">
                    <Card className="event-card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="160"
                          image={`http://localhost:5000/${event.image}`}
                          onError={(e) => (e.target.src = "http://localhost:5000/noImage.png")}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography className="big-title" gutterBottom variant="h5" component="div">
                            {event.title}
                          </Typography>
                          <Typography gutterBottom variant="body2" color="text.secondary">
                            <span className="small-title">Event Date:</span> {date}
                          </Typography>

                          <Typography gutterBottom variant="body2" color="text.secondary">
                            <span className="small-title">Event Price: </span> {event.price.toFixed(2)}KM
                          </Typography>
                          <Typography gutterBottom variant="body2" color="text.secondary" sx={{ marginBottom: "-5px" }}>
                            <span className="small-title">Event Description:</span> {event.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <ButtonGroup orientation="vertical" fullWidth>
                          <Button
                            id={event._id}
                            onClick={(e) => {
                              e.target.setAttribute("disabled", true);

                              postSomething(
                                patch,
                                "/events/registration-request",
                                { eventId: e.target.id, email, title: event.title },
                                token,
                                setEvents,
                                setMessage,
                                setDisplayNotification
                              );

                              socket?.emit("registeredForEvent", {
                                userWhoRegistered: { user, email },
                                eventTitle: event.title,
                                eventId: e.target.id,
                                creator: event.creator,
                              });
                            }}
                            //users cant register their own event and can register only once
                            disabled={
                              user === event.creator || event.registrationRequests.some((request) => request.userWhoRegistered === email)
                            }
                            fullWidth
                            disableElevation
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            {event.registrationRequests.some((request) => request.userWhoRegistered === email)
                              ? event.registrationRequests.map((request) => request.userWhoRegistered === email && request.status)
                              : "Register for event"}
                          </Button>

                          {event.creator === user && (
                            <Button
                              id={event._id}
                              onClick={(e) => {
                                axios
                                  .delete(
                                    `http://localhost:5000/events/delete-event/${e.target.id}`,

                                    {
                                      headers: {
                                        authorization: `Bearer ${token}`,
                                        eventId: e.target.id,
                                      },
                                    }
                                  )
                                  .then((res) => {
                                    setEvents(res.data.data);
                                    setMessage("Event deleted successfuly!");
                                    setDisplayNotification(true);
                                  })
                                  .catch((err) => {
                                    setMessage("An error occurred when deleting the event!");
                                    setDisplayNotification(true);
                                  });
                              }}
                              variant="contained"
                              color="secondary"
                              size="small"
                              fullWidth
                              disableElevation
                            >
                              Delete
                            </Button>
                          )}
                        </ButtonGroup>
                      </CardActions>
                    </Card>
                  </div>
                </Fade>
              );
            })
        ) : (
          <Loader message={"No events..."} buttonText={"Create one?"} path={"/create-event"} timeout={8000} />
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
