import { createRouter, createWebHistory } from "vue-router";

// home component

import Home from "../views/Home/Home";
import Calendar from "../views/Home/Calendar";
import FamilyMap from "../views/Home/Location";
import Gallery from "../views/Home/Gallery";
import Settings from "../views/Home/Settings.vue";

// global user routes

import authRoute from "./authRoute";
import membersRoute from "./membersRoute";
import homeRoute from "./homeRoute";
import treeRoute from "./treeRoute";

// route lists
const routes = [
  authRoute,
  membersRoute,
  homeRoute,
  treeRoute,
  {
    path: "",
    name: "Home",
    component: Home,
  },

  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
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
