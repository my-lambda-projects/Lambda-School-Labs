import React, {useState} from 'react';
import {Upload, Icon, message} from 'antd';
import {uploadImage} from '../actions/files';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function getBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const StyledUploadImage = props => {
  const [loading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  
  const handleChange = info => {
    if (info.file.status === 'uploading'){
      setIsLoading(true);
      return;
    }
    if (info.file.status === 'done'){
      getBase64(info.file.originFileObj, imageUrl => {
        setIsLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };
  
  const beforeUpload = file => {
    
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage){
      message.warning('You can only upload image file!');
    }
    
    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M){
      message.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  };
  
  const customUpload = async({onError, onSuccess, file}) => {
    uploadImage(file, onError, onSuccess, props.imageName)
      .then(res => {
        message.success('Upload Complete');
        setIsLoading(false);
        props.fileUploadComplete(res.ref.fullPath);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'}/>
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  
  return (
    <StyledDiv>
      <StyledUpload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customUpload}
        style={{
          display: 'flex',
          width: props.width || '256px',
          height: props.height || '256px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
      </StyledUpload>
    </StyledDiv>
  );
};

StyledUploadImage.propTypes = {
  fileUploadComplete: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  imageName: PropTypes.string,
};

const StyledDiv = styled.div`
.ant-upload.ant-upload-select.ant-upload-select-picture-card{
    margin-right: 0px;
    margin-bottom: 0px;
}
`;

const StyledUpload = styled(Upload)``;

export default StyledUploadImage;
