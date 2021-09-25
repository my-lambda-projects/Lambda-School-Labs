import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from 'reactstrap';
import moment from 'moment';
import styled from 'styled-components';

class Invoice extends Component {
  render() {
    return (
      <StyledRow>
        {this.props.invoices.map(invoice => {
          return (
            <Col key={invoice._id} md="4">
              <Card style={{ marginBottom: 5 }}>
                {/* remove .pdf and replace with .jpg */}
                <StyledImage
                  top
                  src={invoice.url.replace(/\b(.pdf)\b/g, '.jpg')}
                  alt="invoice image"
                />
                <CardBody>
                  <CardTitle>{invoice.clientNum.name}</CardTitle>
                  <CardSubtitle style={{ marginBottom: 10 }}>
                    {moment(invoice.dateCreated).format('MM/DD/YYYY')}
                  </CardSubtitle>
                  <CardSubtitle style={{ marginBottom: 10 }}>
                    Total: {invoice.total}
                  </CardSubtitle>
                  <Button
                    href={invoice.url}
                    target="_blank"
                    style={{ backgroundColor: '#4c4b63' }}
                  >
                    Open Invoice
                  </Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </StyledRow>
    );
  }
}

const StyledImage = styled(CardImg)`
  max-width: 15vw;
  margin: auto;
`;

const StyledRow = styled(Row)`
  margin-top: 52px;
`;

const mapStateToProps = state => {
  return {
    invoices: state.userReducer.invoices
  };
};

export default connect(mapStateToProps, null)(Invoice);
