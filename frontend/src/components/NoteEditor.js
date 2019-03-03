import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.selectedNote.title,
      body: this.props.selectedNote.body
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <form className="note-editor">
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          // onChange={this.handle}
        />
        <textarea
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.props.cancelEditingNote}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
