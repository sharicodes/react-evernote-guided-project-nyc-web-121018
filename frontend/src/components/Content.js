import React, { Component } from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: this.props.note,
      edit: false
    };
  }

  showEdit = () => {
    this.setState({
      edit: true
    });
  };

  renderContent = () => {
    // console.log("here");
    if (this.state.edit === true) {
      // console.log("here");
      return <NoteEditor />;
    } else if (this.props.note.id !== undefined) {
      return <NoteViewer note={this.props.note} showEdit={this.showEdit} />;
    } else if (this.state.note.id === undefined && this.state.edit === false) {
      return <Instructions />;
    }
  };

  render() {
    console.log(this.state);
    console.log(this.props.note);
    console.log(this.state.note);
    return (
      <div className="master-detail-element detail">{this.renderContent()}</div>
    );
  }
}

export default Content;
