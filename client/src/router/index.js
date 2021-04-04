import { createRouter, createWebHistory } from "vue-router";

// home component

import Home from "../views/Home/Home";
import FamilyTree from "../views/Home/FamilyTree";
import Calendar from "../views/Home/Calendar";
import FamilyMap from "../views/Home/Location";
import Gallery from "../views/Home/Gallery";

// global user components
import Settings from "../views/Home/Settings.vue";

import authRoute from "./authRoute";
import membersRoute from "./membersRoute";
import homeRoute from "./homeRoute";

// route lists
const routes = [
  authRoute,
  membersRoute,
  homeRoute,
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
