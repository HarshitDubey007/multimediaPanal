// NestedSidebar.js
import React, { useState } from "react";
import SidenavCollapse from "./SidenavCollapse"; // Assuming the path to your SidenavCollapse component
import { List } from "@mui/material";

const NestedSidebar = () => {
  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (itemKey) => {
    if (openItems.includes(itemKey)) {
      setOpenItems(openItems.filter((key) => key !== itemKey));
    } else {
      setOpenItems([...openItems, itemKey]);
    }
  };

  return (
    <List>
      {/* Top-level item 1 */}
      <SidenavCollapse
        name="Dashboard"
        icon="dashboard"
        open={openItems.includes("dashboard")}
        onToggle={() => handleToggle("dashboard")}
      >
        {/* Nested items for Dashboard */}
        <List>
          <SidenavCollapse name="Overview" icon="bar_chart" />
          <SidenavCollapse name="Stats" icon="trending_up" />
        </List>
      </SidenavCollapse>

      {/* Top-level item 2 */}
      <SidenavCollapse
        name="Settings"
        icon="settings"
        open={openItems.includes("settings")}
        onToggle={() => handleToggle("settings")}
      >
        {/* Nested items for Settings */}
        <List>
          <SidenavCollapse name="General" icon="build" />
          <SidenavCollapse name="Security" icon="security" />
        </List>
      </SidenavCollapse>

      {/* Add more top-level or nested items as needed */}
    </List>
  );
};

export default NestedSidebar;
