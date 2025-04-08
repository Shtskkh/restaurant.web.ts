import { createFileRoute } from "@tanstack/react-router";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchProfile, User } from "../utils/utils.ts";

export const Route = createFileRoute("/_auth/profile")({
  loader: async ({ context }) => await fetchProfile(context.auth.login),
  head: () => ({
    meta: [{ title: "Профиль" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user: User = Route.useLoaderData();
  if (!user) {
    return (
      <Typography
        variant="h4"
        color="textPrimary"
        mt={3}
        mb={3}
        sx={{ fontWeight: "bold" }}
      >
        Не удалось загрузить профиль.
      </Typography>
    );
  }
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography
        variant="h4"
        color="textPrimary"
        mt={3}
        mb={3}
        sx={{ fontWeight: "bold" }}
      >
        Профиль
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Фамилия: ${user.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Имя: ${user.firstName}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Отчество: ${user.middleName == undefined ? "−" : user.middleName}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Должность: ${user.position}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Номер телефона: ${user.phoneNumber}`} />
        </ListItem>
      </List>
    </Box>
  );
}
