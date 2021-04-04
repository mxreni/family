import Main from "../views/Home/Main";

const homeRoute = {
  path: "/",
  name: "Main",
  component: Main,
  redirect: {
    name: "Home",
  },
};

export default homeRoute;
