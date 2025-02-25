import React, { useState } from "react";
import { API } from "../../api/Api";

function UseNoteByUser() {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setLoading] = useState(true);
  const handleNotes = async (userId) => {
    await API.get(`api/note/${userId}`).then((res) => {
      setNotes(res.data);
      setLoading(false);
    });
  };

  return { notes, notesLoading, handleNotes };
}

export default UseNoteByUser;
