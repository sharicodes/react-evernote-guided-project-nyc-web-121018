import React from "react";

const NoteItem = props => {
  return (
    <li onClick={() => props.selectNote(props.note.id)}>
      <h2>{props.note.title}</h2>
      <p>
        {props.note.body.length > 50
          ? props.note.body.slice(0, 50) + "..."
          : props.note.body}
      </p>
    </li>
  );
};

export default NoteItem;
