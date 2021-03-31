import { createRouter, createWebHistory } from "vue-router";

// auth comp
import Signup from "../views/Auth/SignUp";
import Login from "../views/Auth/Login";

// home component

import Main from "../views/Home/Main";
import Home from "../views/Home/Home";
import Members from "../views/Home/Members";
import FamilyTree from "../views/Home/FamilyTree";
import Calendar from "../views/Home/Calendar";
import FamilyMap from "../views/Home/Location";
import Gallery from "../views/Home/Gallery";

// global user components
import AuthLayout from "../Layout/AuthLayout";
import Settings from "../views/Home/Settings.vue";

// api
import { getCurrentUser } from "../api";

// authcheck middleware
const authCheck = async (to, from, next) => {
  const result = await getCurrentUser();
  console.log(result);
  if (result.status === "success") {
    next({
      name: "Main",
    });
  } else {
    next();
  }
};

// route lists
const routes = [
  {
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
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect: {
      name: "Home",
    },
  },
  {
    path: "",
    name: "Home",
    component: Home,
  },
  {
    path: "/members",
    name: "Members",
    component: Members,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/tree",
    name: "Tree",
    component: FamilyTree,
  },
  {
    path: "/location",
    name: "Location",
    component: FamilyMap,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
