import React, { Fragment } from "react";

const NoteViewer = props => {
  //console.log(props.selectedNote);
  return (
    <Fragment>
      <h2>{props.selectedNote.title}</h2>
      <p>{props.selectedNote.body}</p>
      <button onClick={() => props.editNote(props.selectedNote)}>Edit</button>
    </Fragment>
  );
};

export default NoteViewer;
