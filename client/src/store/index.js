import { createStore } from "vuex";
import auth from "./modules/auth";
import member from "./modules/member";
import relationship from "./modules/relationship";

const store = createStore({
  modules: {
    auth,
    member,
    relationship,
  },
});

export default store;
