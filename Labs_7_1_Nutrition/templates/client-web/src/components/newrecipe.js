import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import CustomForm from './form.js';

class NewReviewModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false
        }
    }
    
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
  
    handleOk = () => {
            this.props.history.push('/recipe')
      }
      
    handleCancel = () => {
        this.setState({ visible: false });
      }
    componentDidMount = () => {
        console.log("newreview page loaded");
    }
    render() {
        const { visible, loading } = this.state;
    return (
      <div>
          
        <Button type="primary" onClick={this.showModal}>
          Add a new recipe
        </Button>
        <Modal
          footer = {null}
          visible={visible}
          title="New Recipe"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CustomForm />
        </Modal>
      </div>
    );
  }
}
export default NewReviewModal;