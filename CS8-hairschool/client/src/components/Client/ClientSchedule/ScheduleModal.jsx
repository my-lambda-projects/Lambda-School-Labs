import React from "react";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
  } from 'react-modal-bootstrap';
  

class ScheduleModal extends React.Component {

    state = {
        isOpen: false,
       
      };
  
    openModal = () => {
        this.setState({
          isOpen: true,
          isSubOpen: false
        });
      };
       
      hideModal = () => {
        this.setState({
          isOpen: false
        });
      };


    render() {
        let subModalDialogStyles = {
            base: {
              bottom: -600,
              transition: 'bottom 0.4s'
            },
            open: {
              bottom: 0
            }
          };

      return (
        <div className='layout-page'>
        <main className='layout-main'>
          <div className='container'>
            <button className='btn btn-primary' onClick={this.openModal}>
              Open Modal
            </button>

            <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
              <ModalHeader>
                <ModalClose onClick={this.hideModal}/>
                <ModalTitle>Modal title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                
                <hr/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aspernatur assumenda ex iure, necessitatibus odit optio quas
                  recusandae repellat totam. Alias dignissimos ea obcaecati quae
                  qui recusandae rem repellendus, vel veniam!</p>

                <p>Consequatur delectus doloremque in quam qui reiciendis rem
                  ut. Culpa cupiditate doloribus eos est ex illum magni nesciunt
                  obcaecati odit ratione, saepe vitae? Accusantium aliquid
                  assumenda fugiat perferendis ratione suscipit!</p>


              </ModalBody>
              <ModalFooter>
                <button className='btn btn-default' onClick={this.hideModal}>
                  Close
                </button>
                <button className='btn btn-primary'>
                  Save changes
                </button>
              </ModalFooter>
            </Modal>
          </div>
        </main>
      </div>
      );
    }
  }


export default ScheduleModal;