import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

const CardContainer = styled(Card)`
  min-width: 200px;
  flex: none;
  margin: 50px;
`;

const BaseCard = props => {
  const {
    name,
    matchId,
    title,
    img,
    img_alt,
    modalToggler,
    clickHandler2,
    clickHandler3,
    clickHandler4
  } = props || false;
  return (
    <CardContainer
      onClick={() => modalToggler(matchId)}
      className="card-container"
    >
      <CardBody>
        <div>
          <img src={img} alt={img_alt} width="50px" />
          <CardTitle>{name}</CardTitle>
        </div>
        <CardSubtitle>{title}</CardSubtitle>
        {clickHandler2 && (
          <Button onClick={() => clickHandler2(matchId)}>Archive</Button>
        )}
        {clickHandler3 && (
          <Button onClick={() => clickHandler3(matchId)}>Email</Button>
        )}
        {clickHandler4 && (
          <Button onClick={() => clickHandler4(matchId)}>something</Button>
        )}
      </CardBody>
    </CardContainer>
  );
};
export default BaseCard;

BaseCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  matchId: PropTypes.any.isRequired,
  modalToggler: PropTypes.func.isRequired,
  clickHandler2: PropTypes.func,
  clickHandler3: PropTypes.func,
  clickHandler4: PropTypes.func
};
BaseCard.defaultProps = {
  matchId: 0,
  name: "default username",
  title: "default title",
  img: "https://www.drupal.org/files/issues/default-avatar.png",
  img_alt: "alt",
  modalToggler: () => {
    console.log("button one");
  }
};
