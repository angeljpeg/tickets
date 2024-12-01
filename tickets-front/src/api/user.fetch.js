import { API_URL, queryGet } from "./const.js";

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTecnicos = async (data) => {
  try {
    const response = await queryGet(`usuarios/tecnicos/`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
