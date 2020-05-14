import React, { Component } from "react";
import "../styles/Modal.scss";
import { isInaccessible } from "@testing-library/react";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { handleClose } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        handleClose();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      },
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  handleOutsideClick(e) {
    const { handleClose } = this.props;
    console.log(this.modal);
    console.log(e.target);

    if (!this.modal.contains(e.target)) {
      // handleClose();
      // document.removeEventListener("click", this.HandleOutsideClick, false);
      console.log("closed");
    }
  }
  render() {
    return (
      <div id="myModal" className="modal">
        <div ref={(node) => (this.modal = node)}>
          <div className="modal-content">
            <span className="close" onClick={this.props.handleClose}>
              &times;
            </span>
            <p className="modal-text">{this.props.info.ADMIN}</p>
          </div>
        </div>
      </div>
    );
  }
}
