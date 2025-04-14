import { createFileRoute } from "@tanstack/react-router";
import { Dish, fetchDishes } from "../utils/utils.ts";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/dishes/")({
  loader: async () => await fetchDishes(),
  head: () => ({
    meta: [{ title: "Блюда" }],
  }),
  component: DishesPage,
});

function DishesPage() {
  const dishes: Dish[] = Route.useLoaderData();

  const columns = useMemo<GridColDef<Dish>[]>(
    () => [
      {
        field: "title",
        headerName: "Название",
        flex: 1,
      },
      {
        field: "cost",
        headerName: "Стоимость",
        flex: 1,
      },
      {
        field: "weightVolume",
        headerName: "Вес (объём)",
        flex: 1,
        valueFormatter: (_value: never, row: Dish) => {
          return `${row.weightVolume} ${row.unit}`;
        },
      },
      {
        field: "availability",
        headerName: "Доступен",
        flex: 1,
        valueFormatter: (value) => {
          return value == true ? "Да" : "Нет";
        },
      },
    ],
    [],
  );

  if (dishes === undefined) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h4"
          color="textPrimary"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Блюда
        </Typography>
        <Typography variant="body1" color="textPrimary" mt={3} mb={3}>
          Не удалось загрузить блюда.
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
        Блюда
      </Typography>
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
