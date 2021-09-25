import { Modal } from 'antd';
import styled from 'styled-components';

const ModalStyled = styled(Modal)`
  && {
  }
`;

const { confirm, error, success, info } = ModalStyled;

export const confirmModal = content => {
  return () => {
    confirm({
      ...content,
      onOk: content.onOk || console.log('OK', content.title || ''),
      onCancel() {
        content.onCancel || console.log('Cancel', content.title || '');
      },
      okType: content.okType || 'primary',
      okText: content.okText || 'OK',
    });
  };
};

export const deleteModal = content => {
  return () => {
    confirm({
      ...content,
      cancelText: content.cancelText || 'No',
      okText: content.okText || 'Yes',
      okType: content.okType || 'danger',
    });
  };
};

export const errorModal = content => {
  return () => {
    error({
      ...content,
      onOk() {
        content.onOk || console.log('OK', content.title || '');
      },
    });
  };
};

export const successModal = content => {
  return () => {
    success({
      ...content,
      onOk: content.onOk || console.log('OK', content.title || ''),
    });
  };
};

export const infoModal = content => {
  return () => {
    info({
      ...content,
      onOk() {
        content.onOk || console.log('OK', content.title || '');
      },
    });
  };
};
