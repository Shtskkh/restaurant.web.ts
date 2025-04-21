import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridEventListener, GridRowParams } from "@mui/x-data-grid";
import { dishesColumns } from "../utils/columns.ts";
import { Dish } from "../utils/types.ts";

export const Route = createFileRoute("/_auth/dishes/")({
  loader: async () => await fetchDishes(),
  head: () => ({
    meta: [{ title: "Блюда" }],
  }),
  component: DishesPage,
});

function DishesPage() {
  const dishes: Dish[] = Route.useLoaderData();
  const navigate = useNavigate();
  const columns = dishesColumns;

  const handleClick: GridEventListener<"rowDoubleClick"> = (
    gridParams: GridRowParams,
  ): void => {
    const id: string = gridParams.row.idDish;
    navigate({ to: "/dishes/$id", params: { id } }).then();
  };

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
        onRowDoubleClick={handleClick}
      />
    </Box>
  );
}
