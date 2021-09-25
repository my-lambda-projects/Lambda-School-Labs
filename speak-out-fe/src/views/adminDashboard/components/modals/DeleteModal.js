import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { toggleDeleteModel } from '../../../../actions';

const DeleteModal = props => {

  const handleOk = e => {
    props.submitActionCB();
    props.toggleDeleteModel(false);
  };

  const handleCancel = e => {
    props.toggleDeleteModel(false);
  };

  return (
    <div>
      <Modal
        title="Are you sure you want to delete this record?"
        visible={props.isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Keep in mind that this will delete this record and all associations
          throughout the database and can not be reverted
        </p>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isVisible: state.deleteModalReducer.isVisible
  };
};
export default connect(mapStateToProps, { toggleDeleteModel })(DeleteModal);
