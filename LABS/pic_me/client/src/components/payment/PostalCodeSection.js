// PostalCodeSection.js
import React from 'react';
import { PostalCodeElement } from 'react-stripe-elements';

class PostalCodeSection extends React.Component {
  render() {
    return (
      <label>
        Address
        <PostalCodeElement style={{ base: { fontSize: '18px' } }} />
      </label>
    );
  }
}

export default PostalCodeSection;
