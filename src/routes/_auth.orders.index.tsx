import { createFileRoute } from "@tanstack/react-router";
import { fetchOrders, Order } from "../utils/utils.ts";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/orders/")({
  loader: async () => await fetchOrders(),
  head: () => ({
    meta: [{ title: "Заказы" }],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const orders: Order[] = Route.useLoaderData();
  const columns = useMemo<GridColDef<Order>[]>(
    () => [
      {
        field: "idOrder",
        headerName: "ID",
        flex: 0.25,
      },
      {
        field: "date",
        headerName: "Дата",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Статус",
        flex: 1,
      },
      {
        field: "tableNumber",
        headerName: "Столик",
        flex: 1,
      },
      {
        field: "employee",
        headerName: "Официант",
        flex: 1,
      },
    ],
    [],
  );

  if (orders === undefined) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h4"
          color="textPrimary"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Заказы
        </Typography>
        <Typography variant="body1" color="textPrimary" mt={3} mb={3}>
          Не удалось загрузить заказы.
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
        Заказы
      </Typography>
      <DataGrid
        columns={columns}
        rows={orders}
        getRowId={(row) => row.idOrder}
        disableColumnMenu={true}
        hideFooter={true}
      />
    </Box>
  );
}
