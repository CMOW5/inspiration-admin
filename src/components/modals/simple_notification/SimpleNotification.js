import React, {Component} from 'react';

/* styles */
import './simple-notification.css';

/**
 * this component show a simple notification message using a modal
 */
export default class SimpleNotification extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.confirmationClicked = this.confirmationClicked.bind(this);
    this.modalType = this.modalType.bind(this);
    this.buttonType = this.buttonType.bind(this);
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  confirmationClicked() {
    this.props.onConfirmationButtonClicked();
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  closeModal() {
    this.props.onCancelButtonClicked();
  }

  /**
   * return the proper classname defined from the parent component
   * @param {string} type
   * @return {string}
   */
  modalType(type) {
    switch (type) {
    case 'danger':
      return 'modal-card-head has-background-danger';

    case 'info':
      return 'modal-card-head has-background-info';

    default:
      return 'modal-card-head has-background-success';
    }
  }

  /**
   * return the proper classname defined from the parent component
   * @param {string} type
   * @return {string}
   */
  buttonType(type) {
    switch (type) {
    case 'danger':
      return 'button is-danger';

    case 'info':
      return 'button is-info';

    default:
      return 'button is-success';
    }
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const message = this.props.message;
    const showModal = this.props.show ? 'modal is-active' : 'modal';
    const modalType = this.modalType(this.props.type);
    const buttonType = this.buttonType(this.props.type);
    return (
      <div className={showModal}>

        <div className="modal-background"></div>

        <div className="modal-card">

          <header className = {modalType}>

            <p className="modal-card-title simple-notification-title">
              {message}
            </p>

            <button
              onClick={this.closeModal}
              className="delete"
              aria-label="close">
            </button>

          </header>

          <footer className="modal-card-foot simple-notification-footer">

            <button
              onClick={this.confirmationClicked}
              className={buttonType}
            >Accept
            </button>

            <button
              onClick={this.closeModal}
              className="button">Cancel
            </button>

          </footer>

        </div>
      </div>
    );
  }
}
