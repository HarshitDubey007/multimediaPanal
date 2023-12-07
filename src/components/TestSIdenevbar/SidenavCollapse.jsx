// SidenavCollapse.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { useSoftUIController } from "../../context";
import SoftBox from "../SoftBox";
import { collapseIcon, collapseIconBox, collapseItem, collapseText } from "../Sidenav/styles/sidenavCollapse";

function SidenavCollapse({ color, icon, name, children, active, noCollapse, open, onToggle, ...rest }) {
  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;

  const handleToggle = () => {
    if (!noCollapse && onToggle) {
      onToggle();
    }
  };

  return (
    <>
      <ListItem component="li" button onClick={handleToggle}>
        <SoftBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color })}
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active })}
          />
        </SoftBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default SidenavCollapse;
