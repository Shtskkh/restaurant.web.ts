import { createFileRoute } from "@tanstack/react-router";
import { Dish, fetchDish } from "../utils/utils.ts";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export const Route = createFileRoute("/_auth/dishes/$id")({
  loader: async ({ params: { id } }) => fetchDish(id),
  head: () => ({
    meta: [{ title: "Блюдо" }],
  }),
  component: DishPage,
});

function DishPage() {
  const dish: Dish = Route.useLoaderData();

  if (dish === undefined) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h4"
          color="textPrimary"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Блюдо
        </Typography>
        <Typography variant="body1" color="textPrimary" mt={3} mb={3}>
          Не удалось загрузить блюдо.
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
        Блюдо
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Название: ${dish.title}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Стоимость: ${dish.cost}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Доступен: ${dish.availability ? "Да" : "Нет"}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Вес (объём): ${dish.weightVolume} ${dish.unit}`}
          />
        </ListItem>
      </List>
    </Box>
  );
}
