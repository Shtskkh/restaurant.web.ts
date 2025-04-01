import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export const Sidebar = () => {
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
        <ListItem>
          <ListItemButton>
            <ListItemText>Профиль</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText>Выйти</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
