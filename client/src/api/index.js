import Axios from "axios";

const prodApiURL = "";
const devApiURL = "http://localhost:3000";
// const devApiURL = "http://:3000";

const axios = Axios.create({
  withCredentials: true,
  baseURL: devApiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email, password) => {
  try {
    const res = await axios.post("login", {
      email,
      password,
    });
    const response = res.data;
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const signup = async (data) => {
  try {
    console.log(data);
    const result = await axios.post("", {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
    console.log(result);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = async () => {
  try {
    const result = await axios.get(`logout`);
    return result;
  } catch (err) {
    return err.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await axios.get();
    return { ...result.data, status: "success" };
  } catch (err) {
    return err.response.data;
  }
};
