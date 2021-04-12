// auth comp
import Signup from "../views/Auth/SignUp";
import Login from "../views/Auth/Login";
import AuthLayout from "../Layout/AuthLayout";

import { getCurrentUser } from "../api";

// authcheck middleware
const authCheck = async (to, from, next) => {
  const result = await getCurrentUser();
  if (result.status === "success") {
    next({
      name: "Main",
    });
  } else {
    next();
  }
};

const authRoute = {
  path: "/",
  components: {
    Auth: AuthLayout,
  },
  children: [
    {
      path: "/",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
  beforeEnter: authCheck,
};

export default authRoute;
