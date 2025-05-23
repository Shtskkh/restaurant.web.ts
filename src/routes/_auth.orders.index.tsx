﻿import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridEventListener, GridRowParams } from "@mui/x-data-grid";
import { ordersColumns } from "../utils/columns.ts";
import { Order } from "../utils/types.ts";

export const Route = createFileRoute("/_auth/orders/")({
  loader: async () => await fetchOrders(),
  head: () => ({
    meta: [{ title: "Заказы" }],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const orders: Order[] = Route.useLoaderData();
  const navigate = useNavigate();
  const columns = ordersColumns;

  const handleClick: GridEventListener<"rowDoubleClick"> = (
    gridParams: GridRowParams,
  ): void => {
    const id: string = gridParams.row.idOrder;
    navigate({ to: "/orders/$id", params: { id } }).then();
  };

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
        onRowDoubleClick={handleClick}
      />
    </Box>
  );
}
