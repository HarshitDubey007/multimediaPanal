import ManageSender from "./Layouts/smsmodule/ManageSender";
import CreateTemplate from "./Layouts/smsmodule/CreateTemplete";
import ManageEntity from "./Layouts/Entity/ManageEntity";
import Shop from "./components/Icons/Shop";
import ManageUsers from "./Layouts/Users/ManageUsers";
import ManageParameter from "./Layouts/Parameter/ManageParameter";
import ManageCampaign from "./Layouts/Campigin/ManageCampaign";
import SignInSide from "./Layouts/auth/SignIn";
import Dashboard from "./Layouts/Dashboard/Dashboard";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Signin",
    key: "signin",
    route: "/",
    icon: <Shop size="12px" />,
    component: <SignInSide />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "manage Entites",
    key: "manageentites",
    route: "/manageentites",
    icon: <Shop size="12px" />,
    component: <ManageEntity />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "manage Campaign",
    key: "managecampaign",
    route: "/managecampaign",
    icon: <Shop size="12px" />,
    component: <ManageCampaign />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Managesender",
    key: "managesender",
    route: "/managesender",
    icon: <Shop size="12px" />,
    component: <ManageSender />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapse",
    name: "Create Templete",
    key: "createtemplete",
    route: "/createtemplete",
    icon: <Shop size="12px" />,
    component: <CreateTemplate />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "manage user",
    key: "manageusers",
    route: "/manageusers",
    icon: <Shop size="12px" />,
    component: <ManageUsers />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Manage Parameter",
    key: "manageparameter",
    route: "/manageparameter",
    icon: <Shop size="12px" />,
    component: <ManageParameter />,
    noCollapse: false,
  },
];

export default routes;
