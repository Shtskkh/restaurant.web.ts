import { createFileRoute } from "@tanstack/react-router";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Employee, fetchProfile } from "../utils/utils.ts";

export const Route = createFileRoute("/_auth/profile")({
  loader: async ({ context }) => {
    if (context.auth.username !== undefined) {
      return await fetchProfile(context.auth.username);
    }
  },
  head: () => ({
    meta: [{ title: "Профиль" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user: Employee = Route.useLoaderData();
  if (user === undefined) {
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
        <Typography variant="body1" color="textPrimary" mt={3} mb={3}>
          Не удалось загрузить профиль.
        </Typography>
      </Box>
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
