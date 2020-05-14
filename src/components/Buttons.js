import React, { Component } from "react";
import "../styles/Buttons.scss";

export default class Buttons extends Component {
  render() {
    return (
      <div>
        <button
          id="law1"
          className="button law1"
          onClick={this.props.changeLaw}
        >
          Law 1
        </button>
        <button
          id="law2"
          className="button law2"
          onClick={this.props.changeLaw}
        >
          Law 2
        </button>
        <button
          id="law3"
          className="button law3"
          onClick={this.props.changeLaw}
        >
          Law 3
        </button>
      </div>
    );
  }
}
