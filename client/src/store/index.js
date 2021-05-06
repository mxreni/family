import { createStore } from "vuex";
import auth from "./modules/auth";
import member from "./modules/member";
import relationship from "./modules/relationship";
import tree from "./modules/Tree";

const store = createStore({
  modules: {
    auth,
    tree,
    member,
    relationship,
  },
});

export default store;
