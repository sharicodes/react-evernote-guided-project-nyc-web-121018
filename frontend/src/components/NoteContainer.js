import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

const noteAPI = "http://localhost:3000/api/v1/notes";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: {},
      selectedNoteId: null,
      selectedEdit: false,
      search: ""
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

  selectNote = id => {
    let selectedNote = this.state.notes.find(note => note.id === id);
    this.setState({
      selectedNote: selectedNote,
      selectedNoteId: id,
      selectedEdit: false
    });
    //console.log(selectedNote);
  };
  findNote = () => {
    return this.state.notes.find(note => note.id === this.state.selectedNoteId);
  };
  postNewNote = () => {
    const defaultNote = {
      title: "Title",
      body: "click on Title and then click Edit to write a new note"
    };
    fetch(noteAPI, {
      method: "POST",
      body: JSON.stringify(defaultNote),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(newNote => {
        this.setState({
          notes: [...this.state.notes, newNote]
        });
      });
  }; //postNewNote()

  handleClickEdit = () => {
    //the selectedEdit will trigger the conditional render of the NoteEditor Component
    this.setState({
      selectedEdit: true
    });
  };

  handleChange = event => {
    //search filter
    this.setState({
      searchInput: event.target.value
    });
  };

  filteredNotes = () => {
    return this.state.notes.filter(
      note =>
        note.title
          .toLowerCase()
          .includes(this.state.searchInput.toLowerCase()) ||
        note.body.toLowerCase().includes(this.state.searchInput.toLowerCase())
    );
  };

  submittedNote = (title, body) => {
    //update the notesList with the newly edited note.
    const updatedNote = { title: title, body: body };

    fetch(`http://localhost:3000/api/v1/notes/${this.state.selectedNoteId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(updatedNote => {
        const copyNotes = [...this.state.notes];
        const findEditNote = this.findNote();
        const index = copyNotes.indexOf(findEditNote);
        copyNotes[index] = updatedNote;
        this.setState({
          notes: copyNotes,
          selectedEdit: false
        });
      });
  };

  render() {
    //console.log(this.state.selectedNote);
    return (
      <Fragment>
        <Search updateSearch={this.updateSearch} />
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            selectNote={this.selectNote}
            postNewNote={this.postNewNote}
          />
          <Content
            note={this.state.selectedNote}
            selectedNoteId={this.state.selectedNoteId}
            selectedEdit={this.state.selectedEdit}
            handleClickEdit={this.handleClickEdit}
            submittedNote={this.submittedNote}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
