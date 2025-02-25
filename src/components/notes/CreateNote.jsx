import React, { useContext, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "../../styles/note.scss";
import UseCreateNote from "../../hooks/notes/UseCreateNote";
import { CurrentUserContext } from "../../App";

function CreateNote({ userId, setNoteOpen }) {
  const [note, setNote] = useState(false);
  const { user } = useContext(CurrentUserContext);
  const { handleNoteCreate, loadingNote } = UseCreateNote();
  const handleSubmit = async () => {
    await handleNoteCreate({
      createdByIds: [userId],
      content: note,
      userId: user.id,
    });
    setNoteOpen({ open: false, userId: null });
  };

  return (
    <>
      <input
        type="text"
        placeholder="ნოუთი"
        onChange={(e) => setNote(e.target.value)}
      />
      <button disabled={loadingNote} className="submit" onClick={handleSubmit}>
        გაგზავნა
      </button>
    </>
  );
}

export default CreateNote;
