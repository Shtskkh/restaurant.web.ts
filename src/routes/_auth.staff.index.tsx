import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Employee, fetchStaff } from "../utils/utils.ts";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowParams,
} from "@mui/x-data-grid";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/staff/")({
  loader: async () => await fetchStaff(),
  head: () => ({
    meta: [{ title: "Сотрудники" }],
  }),
  component: StaffPage,
});

function StaffPage() {
  const users: Employee[] = Route.useLoaderData();
  const navigate = useNavigate();
  const columns = useMemo<GridColDef<Employee>[]>(
    () => [
      {
        field: "idEmployee",
        headerName: "ID",
        flex: 0.25,
      },
      {
        field: "lastName",
        headerName: "Фамилия",
        flex: 1,
      },
      {
        field: "firstName",
        headerName: "Имя",
        flex: 1,
      },
      {
        field: "middleName",
        headerName: "Отчество",
        flex: 1,
      },
      {
        field: "position",
        headerName: "Должность",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Номер телефона",
        flex: 1,
      },
    ],
    [],
  );

  const handleClick: GridEventListener<"rowDoubleClick"> = (
    gridParams: GridRowParams,
  ): void => {
    const id: string = gridParams.row.idEmployee;
    navigate({ to: "/staff/$id", params: { id } }).then();
  };

  if (users === undefined) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h4"
          color="textPrimary"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Сотрудники
        </Typography>
        <Typography variant="body1" color="textPrimary" mt={3} mb={3}>
          Не удалось загрузить сотрудников.
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
        Сотрудники
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row.idEmployee}
        disableColumnMenu={true}
        onRowDoubleClick={handleClick}
        hideFooter={true}
      />
    </Box>
  );
}
