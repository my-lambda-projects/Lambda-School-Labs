import React from 'react';
import { Upload, Icon, Alert } from 'antd';
import { uploadImage } from '../../actions/files';
import PropTypes from 'prop-types';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class UploadImage extends React.Component {
  state = { loading: false, imageUrl: '' };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  beforeUpload = file => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      Alert.error('You can only upload image file!');
    }

    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      Alert.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  };

  customUpload = async ({ onError, onSuccess, file }) => {
    uploadImage(file, onError, onSuccess)
      .then(res => {
        alert('Upload Complete');
        this.setState({ loading: false });
        this.props.fileUploadComplete(res.ref.fullPath);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          customRequest={this.customUpload}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      </div>
    );
  }
}

UploadImage.propTypes = {
  fileUploadComplete: PropTypes.func.isRequired,
};

export default UploadImage;
