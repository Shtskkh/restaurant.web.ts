import { createFileRoute } from "@tanstack/react-router";
import { DishInOrder, fetchOrder, Order } from "../utils/utils.ts";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { dishesInOrderColumns } from "../utils/columns.ts";

export const Route = createFileRoute("/_auth/orders/$id")({
  loader: async ({ params: { id } }) => fetchOrder(id),
  head: () => ({
    meta: [{ title: "Заказ" }],
  }),
  component: OrderPage,
});

function OrderPage() {
  const order: Order = Route.useLoaderData();
  const dishes: DishInOrder[] = order.dishesInOrder;
  const columns = dishesInOrderColumns;

  if (order === undefined) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h4"
          color="textPrimary"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Заказ
        </Typography>
        <Typography variant="body1" color="textPrimary" mt={3} mb={3}>
          Не удалось загрузить заказ.
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
        {`Заказ №${order.idOrder}`}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Дата: ${order.date}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Стол: ${order.tableNumber}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Статус: ${order.status}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Официант: ${order.employee}`} />
        </ListItem>
      </List>
      <DataGrid
        columns={columns}
        rows={dishes}
        getRowId={(row) => row.idDish}
        disableColumnMenu={true}
        hideFooter={true}
      />
    </Box>
  );
}
