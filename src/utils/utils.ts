import axios from "axios";

export type User = {
  idEmployee: number;
  idPosition: number;
  position: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  phoneNumber: string;
};

export type DishInOrder = {
  idDish: number;
  title: string;
  count: number;
  comment?: string;
  status: string;
  totalCost: number;
};

export type Order = {
  idOrder: number;
  date: string;
  tableNumber: number;
  status: string;
  employee: string;
  dishesInOrder: DishInOrder[];
};

export const fetchProfile = async (
  login: string,
): Promise<User | undefined> => {
  try {
    return (await axios.get<User>(`/api/staff/${login}`)).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStaff = async (): Promise<User[] | undefined> => {
  try {
    return (await axios.get<User[]>(`/api/staff`)).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStaffById = async (id: string): Promise<User | undefined> => {
  try {
    return (await axios.get<User>(`/api/staff/${id}`)).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrders = async (): Promise<Order[] | undefined> => {
  try {
    return (await axios.get<Order[]>("/api/orders")).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrder = async (id: string): Promise<Order | undefined> => {
  try {
    return (await axios.get<Order>(`/api/orders/${id}`)).data;
  } catch (error) {
    console.error(error);
  }
};
