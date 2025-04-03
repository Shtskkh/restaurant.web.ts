import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import InventoryIcon from "@mui/icons-material/Inventory";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";
import { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { auth } from "../contexts/auth.tsx";

type ListItemLinkProps = {
  to: string;
  text: string;
  icon?: ReactNode;
};

const ListItemLink = ({ to, icon, text }: ListItemLinkProps) => {
  return (
    <ListItem disableGutters>
      <ListItemButton component={Link} href={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const tabs: ListItemLinkProps[] = [
  { to: "/profile", text: "Профиль", icon: <PersonIcon /> },
  { to: "/dashboard", text: "Сводка", icon: <DashboardIcon /> },
  { to: "/orders", text: "Заказы", icon: <ListIcon /> },
  { to: "/dishes", text: "Блюда", icon: <RestaurantIcon /> },
  { to: "/staff", text: "Сотрудники", icon: <AccessibleForwardIcon /> },
  { to: "/supplies", text: "Поставки", icon: <InventoryIcon /> },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handeLogOut = () => {
    auth.signOut();
    navigate({ to: "/login" }).then();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {tabs.map((tab) => (
          <ListItemLink
            key={tab.to}
            to={tab.to}
            text={tab.text}
            icon={tab.icon}
          />
        ))}
        <Divider />
        <ListItem disableGutters>
          <ListItemButton onClick={handeLogOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
