import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  render() {
    return (
      <div className="master-detail-element sidebar">
        <NoteList
          notes={this.props.notes}
          selectedNote={this.props.selectedNote}
          handleClick={this.props.handleClick}
        />
        <button>New</button>
      </div>
    );
  }
}

export default Sidebar;
