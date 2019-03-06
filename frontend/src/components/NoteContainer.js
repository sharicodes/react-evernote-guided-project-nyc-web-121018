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
      filteredNotes: [],
      searchInput: ""
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

  handleClickEdit = () => {
    this.setState({
      selectedEdit: true
    });
  };

  handleSearchInput = event => {
    //console.log(event.target.value);
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
  handleClickDelete = () => {
    fetch(`http://localhost:3000/api/v1/notes/${this.state.selectedNoteId}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(result => {
        const filteredNotes = [...this.state.notes].filter(
          note => note.id !== this.state.selectedNoteId
        );
        this.setState({
          notes: filteredNotes,
          selectedNoteId: null,
          selectedEdit: false
        });
      });
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
  };

  submittedNote = (title, body) => {
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
        <Search handleSearchInput={this.handleSearchInput} />
        <div className="container">
          <Sidebar
            notes={this.filteredNotes()}
            selectNote={this.selectNote}
            postNewNote={this.postNewNote}
          />
          <Content
            note={this.state.selectedNote}
            selectedNoteId={this.state.selectedNoteId}
            selectedEdit={this.state.selectedEdit}
            handleClickEdit={this.handleClickEdit}
            submittedNote={this.submittedNote}
            handleClickDelete={this.handleClickDelete}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
