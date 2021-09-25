import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('portal'); // portal div is now root

class Modal extends React.Component {
  constructor() {
    super();
    this.el = document.createElement('div'); // creates portal div
  }

  componentDidMount = () => {
    modalRoot.appendChild(this.el); // portal mounts => creates a div
  }

  componentWillUnmount = () => {
    modalRoot.removeChild(this.el); // portal unmounts => removes div
  }

  render() {
    return createPortal(
      <div
        className="modal-portal"
        style={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 999,
        }}
        // onClick={this.props.onClose}
        >
        <div
          className="portal-container"
          style={{
            padding: 20,
            background: '#fff',
            borderRadius: '15px',
            display: 'inline-block',
            minHeight: '300px',
            margin: '1rem',
            position: 'relative',
            minWidth: '300px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            justifySelf: 'center'
          }}>
          {this.props.children}
        </div>
      </div>,
      this.el,
    ) // created portal passes child components and element
  }
}

export default Modal;