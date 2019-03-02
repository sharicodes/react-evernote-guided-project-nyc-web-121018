import React from "react";
import NoteItem from "./NoteItem";

const NoteList = props => {
  return (
    <ul>
      {props.notes.map(note => {
        return (
          <NoteItem
            key={note.id}
            note={note}
            id={note.id}
            selectNote={props.selectNote}
          />
        );
      })}
    </ul>
  );
};

export default NoteList;
