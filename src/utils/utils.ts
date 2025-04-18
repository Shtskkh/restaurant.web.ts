import axios from "axios";
import { components } from "./schema";

export type Employee = components["schemas"]["StaffModel"];
export type Dish = components["schemas"]["DishModel"];
export type DishInOrder = components["schemas"]["DishInOrderModel"];
export type Order = components["schemas"]["OrderModel"];

export const fetchProfile = async (
  login: string,
): Promise<Employee | undefined> => {
  try {
    return (await axios.get<Employee>(`/api/staff/${login}`)).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStaff = async (): Promise<Employee[] | undefined> => {
  try {
    return (await axios.get<Employee[]>(`/api/staff`)).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStaffById = async (
  id: string,
): Promise<Employee | undefined> => {
  try {
    return (await axios.get<Employee>(`/api/staff/${id}`)).data;
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

export const fetchDishes = async (): Promise<Dish[] | undefined> => {
  try {
    return (await axios.get<Dish[]>("/api/dishes")).data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDish = async (id: string): Promise<Dish | undefined> => {
  try {
    return (await axios.get<Dish>(`/api/dishes/${id}`)).data;
  } catch (error) {
    console.error(error);
  }
};
