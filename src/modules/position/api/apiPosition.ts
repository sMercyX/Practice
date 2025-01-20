import type { 
  Employ1, 
  // ImpData, 
  Pagi } from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";

export const fetchDataPosition = async (pagiData: Pagi) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Index`,
      pagiData
    );
    return datas
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const createPosition = async (PositionData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Create`,
      PositionData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const updatePosition = async (PositionData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Update`,
      PositionData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getDetail = async (PositionId: string) => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Position/GetDetail?id=${PositionId}`
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const deletePosition = async (PositionId: string) => {
  try {
    await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Delete`,
      PositionId
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getPositionDropDown = async () => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Position/GetPositionDropDown`
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};