import { GridColDef } from "@mui/x-data-grid";
import { Dish, DishInOrder, Employee, Order } from "./types.ts";

export const employeeColumns: GridColDef<Employee>[] = [
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
];

export const ordersColumns: GridColDef<Order>[] = [
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
];

export const dishesInOrderColumns: GridColDef<DishInOrder>[] = [
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
];

export const dishesColumns: GridColDef<Dish>[] = [
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
];
