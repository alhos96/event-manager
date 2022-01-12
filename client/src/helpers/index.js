import axios from "axios";

export const changeHandler = (e, userInput, setUserInput) => {
  setUserInput({ ...userInput, [e.target.name]: e.target.value });
};

export const onSubmit = (e, dispatch, action, url, userInput, method, token) => {
  e.preventDefault();
  dispatch(action(url, userInput, method, token));
};

export const getSomething = (method, url, token, setState) => {
  axios({
    method,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    url: `http://localhost:5000${url}`,
  }).then((response) => {
    setState(response.data.data);
  });
};

export const postSomething = (method, url, data, token, setState) => {
  axios({
    method,
    data,
    headers: { Authorization: `Bearer ${token}` },
    url: `http://localhost:5000${url}`,
  }).then((response) => {
    setState(response.data.data);
  });
};

export const setCurrentlyActiveLink = (linkButtons, url) => {
  // eslint-disable-next-line
  linkButtons.map((link) => {
    if (link.id === url && !link.classList.contains("selected")) {
      link.classList.add("selected");
    } else {
      link.classList.remove("selected");
    }
  });
};

export const colorSetter = (status) => {
  if (status === "Rejected") {
    return "red";
  } else if (status === "Accepted") {
    return "green";
  } else if (status === "Pending") {
    return "#131313";
  }
};

export const methods = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  remove: "DELETE",
};

export const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Create Event", path: "/create-event" },
  { name: "Registrations", path: "/registrations" },
];

export const categories = ["Courses", "Meetups"];

export const filters = ["All Events", "My Events", "Courses", "Meetups"];
