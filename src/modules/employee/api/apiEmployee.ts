import type { Employ1, Pagi } from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";

export const fetchDataEmployee = async (pagiData: Pagi) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Index`,
      pagiData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const createEmployee = async (employeeData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Create`,
      employeeData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const updateEmployee = async (employeeData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Update`,
      employeeData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getDetail = async (employeeId: string) => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Employee/GetDetail?id=${employeeId}`
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const deleteEmployee = async (employeeId: string) => {
  try {
    await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Delete`,
      employeeId
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
