import React from 'react';
import { PostalCodeElement } from 'react-stripe-elements';
import { Card, Badge } from 'reactstrap';

const PostalCodeSection = () => (
  <Card>
    <h4>
          Postal Code Info <Badge />
    </h4>
    <PostalCodeElement style={{ base: { fontSize: '18px' } }} />
  </Card>
);


export default PostalCodeSection;
