import { API_URL } from "./const.js";


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
