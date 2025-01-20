import type { 
  Employ1, 
  // ImpData, 
  Pagi } from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";

export const fetchDataTeam = async (pagiData: Pagi) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Index`,
      pagiData
    );
    return datas
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const createTeam = async (TeamData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Create`,
      TeamData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const updateTeam = async (TeamData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Update`,
      TeamData
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getDetail = async (TeamId: string) => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Team/GetDetail?id=${TeamId}`
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const deleteTeam = async (TeamId: string) => {
  try {
    await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Delete`,
      TeamId
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getTeamDropDown = async () => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Team/GetTeamDropDown`
    );
    return datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};