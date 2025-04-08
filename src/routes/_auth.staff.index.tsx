import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fetchStaff, User } from "../utils/utils.ts";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/staff/")({
  loader: async () => await fetchStaff(),
  head: () => ({
    meta: [{ title: "Сотрудники" }],
  }),
  component: StaffPage,
});

function StaffPage() {
  const users: User[] = Route.useLoaderData();
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "idEmployee",
      },
      {
        header: "Фамилия",
        accessorKey: "lastName",
      },
      {
        header: "Имя",
        accessorKey: "firstName",
      },
      {
        header: "Отчество",
        accessorKey: "middleName",
      },
      {
        header: "Должность",
        accessorKey: "position",
      },
      {
        header: "Номер телефона",
        accessorKey: "phoneNumber",
      },
    ],
    [],
  );

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
      <StaffTable data={users} columns={columns} />
    </Box>
  );
}

function StaffTable({
  data,
  columns,
}: {
  data: User[];
  columns: ColumnDef<User>[];
}) {
  const table = useReactTable<User>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  variant="head"
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getCoreRowModel().rows.map((row) => {
            const handleClick = () => {
              const id = row.original.idEmployee.toString();
              navigate({ to: `/staff/$id`, params: { id } }).then();
            };
            return (
              <TableRow
                onClick={handleClick}
                hover
                key={row.id}
                sx={{ cursor: "pointer" }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
