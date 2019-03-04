import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: {}
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
    this.setState({ selectedNote });
    //console.log(selectedNote);
  };

  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar notes={this.state.notes} selectNote={this.selectNote} />
          <Content note={this.state.selectedNote} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
