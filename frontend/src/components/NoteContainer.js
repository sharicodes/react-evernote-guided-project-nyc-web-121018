import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      selectedNote: null,
      noteToEdit: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
      .then(response => response.json())
      .then(notes =>
        this.setState({
          notes: notes
        })
      );
  }

  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            handleClick={this.handleClick}
            selectedNote={this.state.selectedNote}
          />
          <Content
            selectedNote={this.state.selectedNote}
            noteToEdit={this.state.noteToEdit}
            editNote={this.editNote}
            handleChange={this.handleChange}
            cancelEditingNote={this.cancelEditingNote}
          />
        </div>
      </Fragment>
    );
  }

  handleClick = selectedNote => {
    this.setState({
      selectedNote: selectedNote,
      noteToEdit: null
    });
  };

  editNote = selectedNote => {
    this.setState({
      noteToEdit: selectedNote
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  cancelEditingNote = () => {
    this.setState({
      noteToEdit: null
    });
  };
}

export default NoteContainer;
