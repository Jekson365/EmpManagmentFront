import React, { useState } from "react";
import { API } from "../../api/Api";

function UseVacationIndex() {
  const [vacations, setVacations] = useState([]);
  const useVacation = async (userId) => {
    try {
      const response = await API(`api/vacation/${userId}`);
      setVacations(response.data);
    } catch (error) {
      console.error("Error creating vacation:", error);
      throw error;
    }
  };

  return { vacations, useVacation };
}

export default UseVacationIndex;
