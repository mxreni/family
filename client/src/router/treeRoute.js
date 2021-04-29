import Tree from "../views/Home/Tree/index";
import AddFamilyTree from "../views/Home/Tree/AddFamilyTree";
import ViewFamilyTree from "../views/Home/Tree/ViewFamilyTree";
import ViewMember from "../views/Home/Tree/ViewMember";

const treeRoute = {
  path: "/tree",
  name: "Tree",
  component: Tree,
  children: [
    {
      path: "",
      name: "Tree.Add",
      component: AddFamilyTree,
    },
    {
      path: "view-tree",
      name: "Tree.View",
      component: ViewFamilyTree,
    },
    {
      path: ":memberId",
      props: true,
      name: "Tree.member",
      component: ViewMember,
    },
  ],
};

export default treeRoute;
