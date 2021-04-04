import Members from "../views/Home/Members/index";
import MembersGrid from "../views/Home/Members/MembersGridView";
import MembersTable from "../views/Home/Members/MembersTableView";

const membersRoute = {
  path: "/members",
  name: "Members",
  component: Members,
  redirect: {
    name: "Members.grid",
  },
  children: [
    {
      path: "",
      name: "Members.grid",
      component: MembersGrid,
    },
    {
      path: "/lists",
      name: "Members.table",
      component: MembersTable,
    },
  ],
};

export default membersRoute;
