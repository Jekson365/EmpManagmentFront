import React, { useState } from "react";
import { API } from "../../api/Api";

function UseCreateNote() {
  const [loadingNote, setLoading] = useState(false);

  const handleNoteCreate = async (params) => {
    try {
      setLoading(true);
      await API.post("api/note", params);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      throw err;
    }
  };

  return { handleNoteCreate, loadingNote };
}

export default UseCreateNote;
