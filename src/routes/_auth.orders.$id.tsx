import { createFileRoute } from "@tanstack/react-router";
import { DishInOrder, fetchOrder, Order } from "../utils/utils.ts";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
  const columns = useMemo<GridColDef<DishInOrder>[]>(
    () => [
      {
        field: "title",
        headerName: "Блюдо",
        flex: 1,
      },
      {
        field: "count",
        headerName: "Количество",
        flex: 1,
      },
      {
        field: "comment",
        headerName: "Комментарий",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Статус",
        flex: 1,
      },
      {
        field: "totalCost",
        headerName: "Сумма",
        flex: 1,
      },
    ],
    [],
  );

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
