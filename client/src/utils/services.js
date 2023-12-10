import axios from "axios";

export const baseUrl = "/api";

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data?.message || error.message,
    };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);

    return await response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data?.message || error.message,
    };
  }
};

export const putRequest = async (url, body) => {
  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data?.message || error.message,
    };
  }
};
