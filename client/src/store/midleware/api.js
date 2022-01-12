import axios from "axios";
import { apiRequestStarted } from "../actions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiRequestStarted.type) {
      return next(action);
    }

    const { url, userInput, method, token, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000",
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        data: userInput,
        method,
      });
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: { data: response.data } });
      }
    } catch (error) {
      dispatch({ type: onError, payload: error.response.data.message });
    }
  };

export default api;
