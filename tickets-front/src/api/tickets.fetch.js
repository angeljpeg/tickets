import { API_URL, queryDelete, queryPut } from "./const.js";


export const allTickets = async () => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const ticketsByUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/tickets/usuario/${data}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addTicket = async (data) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
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

export const deleteTicket = async (data) => {
  try {
    console.log(data);
    const response = await queryDelete(`tickets/delete/${data}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const editTicket = async (data) => {
  try {
    const bodyData = {
      tituloTicket: data.tituloTicket,
      descripcionTicket: data.descripcionTicket,
      prioridadTicket: data.prioridadTicket,
    };
    const response = await queryPut(`tickets/edit/${data.idTicket}`, bodyData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}