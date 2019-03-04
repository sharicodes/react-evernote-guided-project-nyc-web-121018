import React from "react";

const NoteItem = props => {
  //console.log(props.id);
  return (
    <li onClick={() => props.selectNote(props.note.id)}>
      <h2>{props.title}</h2>
      <p>{props.truncated}</p>
    </li>
  );
};
export default NoteItem;
