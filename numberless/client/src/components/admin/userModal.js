import React from 'react';
import { 
  Button, 
  Modal,
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form,
  FormGroup,
  Input
} from 'reactstrap'

import './modal.css'

const UserModal = props => {
  const toggle = props.toggle;
  const modal = props.modal;
  const addUser = () => {
    console.log('adding!');
  }
  return (
    <div>
        <Button color="danger" onClick={toggle}>Add User</Button>
        <Modal className="modalBox" isOpen={modal} toggle={toggle}>
          <ModalBody className="bodyBox">
            <div className="modalForm">
              <Form>
                <FormGroup>
                  <Input className="input" type="email" name="email" id="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                  <Input className="input" type="password" name="password" id="password" placeholder="Password"/>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter className="footer">
            <Button className="modalButton" color="primary" onClick={ () => {
              toggle();
              addUser();
            }}>Submit</Button>{' '}
            <Button className="modalButton" color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default UserModal;