import React from "react";

const NoteItem = props => (
  <li onClick={() => props.handleClick(props.note)}>
    <h2>{props.note.title}</h2>
    <p>{props.note.body.slice(0, 20)}...</p>
  </li>
);

export default NoteItem;
