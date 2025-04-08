import { createFileRoute } from "@tanstack/react-router";
import { fetchStaffById, User } from "../utils/utils.ts";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export const Route = createFileRoute("/_auth/staff/$id")({
  loader: async ({ params: { id } }) => fetchStaffById(id),
  head: () => ({
    meta: [{ title: "Профиль" }],
  }),
  component: EmployeePage,
});

function EmployeePage() {
  const user: User = Route.useLoaderData();
  if (!user) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h4"
          color="textPrimary"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Сотрудник
        </Typography>
        <Typography variant="h5">Не удалось найти сотрудника.</Typography>
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
        Сотрудник
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
