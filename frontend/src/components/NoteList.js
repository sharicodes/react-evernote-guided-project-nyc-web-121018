import React from "react";
import NoteItem from "./NoteItem";

const NoteList = props => {
  //console.log(props.notes);
  return (
    <ul>
      {props.notes.map(note => {
        return (
          <NoteItem
            note={note}
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            truncated={
              note.body.length > 25 ? note.body.slice(0, 25) + "..." : note.body
            }
            selectNote={props.selectNote}
          />
        );
      })}
    </ul>
  );
};

export default NoteList;
