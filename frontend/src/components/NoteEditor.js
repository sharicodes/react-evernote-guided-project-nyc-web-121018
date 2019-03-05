import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.note.title,
      body: this.props.note.body
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitEdit = event => {
    event.preventDefault();
    this.props.submittedNote(this.state.title, this.state.body);
  };

  render() {
    //console.log(this.props.note);
    return (
      <form className="note-editor" onSubmit={this.handleSubmitEdit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={this.props.note.title}
          onChange={this.handleChange}
        />
        <textarea
          name="body"
          defaultValue={this.props.note.body}
          onChange={this.handleChange}
        />
        <div className="button-row">
          <input
            className="button"
            data-id={this.props.note.id}
            type="submit"
            value="Save"
          />
          <button onClick={() => this.props.cancelEdit()} type="button">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
