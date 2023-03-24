import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ImageContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ImageContainer>
          <img src={src} alt={alt} />
        </ImageContainer>
      </Overlay>,
      modalRoot
    );
  }
}
