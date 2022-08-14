
import React, {Component} from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalBox } from "./Modal.styled";

const modalRoot = document.getElementById('modal-root');

 class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  onClose = ({ code, target, currentTarget }) => {
    if (code === 'Escape' || target === currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onClose}>
        <ModalBox>{this.props.children}</ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal