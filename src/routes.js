import ManageSender from "./Layouts/sender/ManageSender";
// import CreateTemplate from "./Layouts/smsmodule/CreateTemplete";
import ManageEntity from "./Layouts/Entity/ManageEntity";
import Shop from "./components/Icons/Shop";
import ManageUsers from "./Layouts/Users/ManageUsers";
import ManageParameter from "./Layouts/Parameter/ManageParameter";
import ManageCampaign from "./Layouts/Campigin/ManageCampaign";
import SignInSide from "./Layouts/auth/SignIn";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import ManageTemplate from "./Layouts/smsTemplete/ManageTemplate";
import CampaignIcon from '@mui/icons-material/Campaign';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import OutboxIcon from '@mui/icons-material/Outbox';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FenceIcon from '@mui/icons-material/Fence';
import ManageClientApiJson from "./Layouts/ClientApiJSON/ManageClientApiJson";
import ComponentJSON from "./Layouts/ComponentJSON/ComponentJSON";
import ManageSendSms from "./Layouts/sendSMS/ManageSendSms";
import ManageMenumap from "./Layouts/Menumapping/ManageMenumap";


const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Shop size="12px" />,
  //   noCollapse: true,
  //   collapse:[{
  //     type: "collapse",
  //     name: "Dashboard2",
  //     key: "dashboard2",
  //     icon: <Shop size="12px" />,
  //     noCollapse: true,
  //     collapse:[{
  //       type: "collapse",
  //       name: "Dashboard",
  //       key: "dashboard",
  //       route: "/dashboard",
  //       icon: <Shop size="12px" />,
  //       component: <Dashboard />,
  //       noCollapse: false,
  //     }]
  //   }]
  // },
  {
    type: "collapse",
    name: "Manage Entites",
    key: "manageentites",
    route: "/manageentites",
    icon: <FingerprintIcon size="12px" />,
    component: <ManageEntity />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Manage Campaign",
    key: "managecampaign",
    route: "/managecampaign",
    icon: <CampaignIcon size="12px" />,
    component: <ManageCampaign />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Manage Sender",
    key: "managesender",
    route: "/managesender",
    icon: <OutboxIcon size="12px" />,
    component: <ManageSender />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Create Templete",
    key: "createtemplete",
    route: "/createtemplete",
    icon: <Shop size="12px" />,
    component: <ManageTemplate />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Send SMS",
    key: "sendsms",
    route: "/sendsms",
    icon: <Shop size="12px" />,
    component: <ManageSendSms/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Manage User",
    key: "manageusers",
    route: "/manageusers",
    icon: <ManageAccountsIcon size="12px" />,
    component: <ManageUsers />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Manage Menu Map",
    key: "managemenumap",
    route: "/managemenumap",
    icon: <ManageAccountsIcon size="12px" />,
    component: <ManageMenumap />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Manage Parameter",
    key: "manageparameter",
    route: "/manageparameter",
    icon: <FenceIcon size="12px" />,
    component: <ManageParameter />,
    noCollapse: false,
  },
  // {
  //   type: "collapse",
  //   name: "Manage Client Api JSON",
  //   key: "clientapijson",
  //   route: "/clientapijson",
  //   icon: <FenceIcon size="12px" />,
  //   component: <ManageClientApiJson />,
  //   noCollapse: false,
  // },
  // {
  //   type: "collapse",
  //   name: "Manage Component JSON",
  //   key: "componentjson",
  //   route: "/componentjson",
  //   icon: <FenceIcon size="12px" />,
  //   component: <ComponentJSON />,
  //   noCollapse: false,
  // },
];

export default routes;
