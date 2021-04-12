import Tree from "../views/Home/Tree/index";
import AddFamilyTree from "../views/Home/Tree/AddFamilyTree";
import ViewFamilyTree from "../views/Home/Tree/ViewFamilyTree";

const treeRoute = {
  path: "/tree",
  name: "Tree",
  component: Tree,
  redirect: {
    name: "Tree.Add",
  },
  children: [
    {
      path: "",
      name: "Tree.Add",
      component: AddFamilyTree,
    },
    {
      path: "/view-tree",
      name: "Tree.View",
      component: ViewFamilyTree,
    },
  ],
};

export default treeRoute;
