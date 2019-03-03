import React, { Component } from "react";
import NoteItem from "./NoteItem";

class NoteList extends Component {
  render() {
    return (
      <ul>
        {this.props.notes.map(note => (
          <NoteItem
            note={note}
            key={note.id}
            handleClick={this.props.handleClick}
            selectedNote={this.props.selectedNote}
          />
        ))}
      </ul>
    );
  }
}
export default NoteList;
