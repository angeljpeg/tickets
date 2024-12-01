import { queryGet, queryPost, queryPut } from "./const.js";

export const getAllCitas = async () => {
  try {
    const response = await queryGet("citas");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addCita = async (data) => {
  try {
    const response = await queryPost("citas", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCitaByUser = async (data) => {
  try {
    const response = await queryGet(`citas/usuario/${data}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCitaByTecnico = async (data) => {
  try {
    const response = await queryGet(`citas/tecnico/${data}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const completeCita = async (data) => {
  try {
    const bodyData = {
      idUsuario: data.idUsuario,
      newStatus: data.newStatus,
    };
    const response = await queryPut(`citas/complete/${data.idCita}`, bodyData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
