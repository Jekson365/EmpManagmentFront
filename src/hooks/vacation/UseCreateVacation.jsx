import React from "react";
import { API } from "../../api/Api";

function UseCreateVacation() {
  const createVacation = async (params) => {
    try {
      const response = await API.post("api/vacation", params);
      return response.data;
    } catch (error) {
      console.error("Error creating vacation:", ebrror);
      throw error;
    }
  };

  return { createVacation };
}

export default UseCreateVacation;
