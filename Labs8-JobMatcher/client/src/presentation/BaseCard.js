import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TagCloud from "react-tag-cloud";
import randomColor from "randomcolor";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Alert
} from "reactstrap";
import ConfirmSpending from "../features/billing/component/ConfirmSpending/ConfirmSpending";

const ShowFullCard = styled.div`
  display: ${props => (props.is_open ? "block" : "none")};
`;
const StyledH5 = styled.h5`
  color: ${props => (props.is_seeker ? "red" : "green")};
  color: white;
  text-transform: capitalize;
  cursor: pointer;
`;
const StyledButton = styled(Button)`
  // background-color: #207ccae8;
  // color: #444444;
  background-color: ${props => {
    if (props.btn1) return "#31638f";
    if (props.btn2) return "#200ccae8";
    if (props.btn3) return "#209ccae8";
    if (props.arrow) return "none";
  }};
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  margin: auto;
  /* padding: 6px 135px; */
  /* width: 100%; */
  /* box-sizing: border-box; */
  border: none;
  border: 1px solid;
  border-radius: 0;
  background-color: transparent;
  color: white;
  transition: all 0.4s;
  &:hover,
  &:focus,
  &:active {
    background-color: #444444 !important;
    color: white !important;
    border: 1px solid white !important;
    border: 1px solid white !important;
  }
  &:not(:disabled):not(.disabled):active {
    background-color: #444444;
    color: white;
    border: 1px solid;
  }
`;
const StyledCard = styled(Card)`
    width: ${props => (props.width ? props.width : "100%")}
    background-color: #444
    color: white;
    margin: 10px auto;
    text-align: start;
    border-radius: 0;
    border-left: 20px solid #207ccae8;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 15px 10px;
    i{
        cursor: pointer;
        &:hover{
            color: #207ccae8;
        }
    }
    @media (min-width: 900px) {
      margin: 10px 5px;
    }
`;
const CardHeader = styled.div`
  width: "100%";
  height: 100px;
  display: flex;
  border-radius: 1px;
  border-bottom: 1px solid #207ccae8;
  padding-bottom: 10px;
  img {
    width: 100px;
  }
  div {
    flex: 1;
    margin: auto;
    margin-left: 20px;
  }
  h6 {
    height: 59px;
    overflow: scroll;
  }
`;
const StyledCardBody = styled(CardBody)`
  text-align: start;
  div {
    text-align: center;
  }
`;
const CardFooter = styled.div`
  width: "100%";
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: 18px;
  text-transform: capitalize;
  text-decoration: underline;
`;

const ExplicitBaseCard = props => {
  // console.log("ExplicitBaseCard", { props });
  return (
    <StyledCard width={props.width} onClick={props.toggle}>
      <CardHeader className="styled-card-header">
        <CardImg
          src={
            props.photo || "https://image.flaticon.com/icons/svg/52/52762.svg"
          }
          alt="Card image cap"
        />
        <div>
          <StyledH5 is_seeker={props.is_seeker}>{props.name}</StyledH5>
          <CardSubtitle>{props.summary}</CardSubtitle>
        </div>
      </CardHeader>
      <StyledCardBody className="card-body">
        <StyledCardTitle className="card-title">{props.title}</StyledCardTitle>
        {
          //props.skills &&
          //  props.skills.map((skill, i) => <CardText key={i}>{skill}</CardText>)}
          //  {props.extra_skills &&
          //    props.extra_skills.map((skill, i) => (
          //    <CardText key={i}>{skill}</CardText>
          //  ))
        }
        {/*<CardText>*/}
        {props.skills && (
          <TagCloud
            style={{
              fontFamily: "sans-serif",
              fontSize: 15,
              fontWeight: "bold",
              color: () => randomColor(),
              width: "100%",
              minHeight: "50px",
              padding: 5
            }}
          >
            {props.skills &&
              props.skills.map((skill, i) => (
                <p key={10 * Date.now()}>{skill} </p>
              ))}
            {props.extra_skills &&
              props.extra_skills.map((skill, i) => (
                <p key={Math.random() * Date.now()}>{skill}</p>
              ))}
          </TagCloud>
        )}
        {/*</CardText>*/}

        <ShowFullCard is_open={props.is_open} className="showfullcard">
          <CardText>{props.experience}</CardText>
          <CardText>{props.salary_min}</CardText>
          <CardText>{props.salary_max}</CardText>
          <CardText>{props.education}</CardText>
          <CardText>{props.description}</CardText>
          <CardText>{props.requirements}</CardText>
        </ShowFullCard>
        <div>
          {props.is_expandable &&
            (props.is_open ? (
              <i className="fas fa-arrow-up" onClick={props.fullCardArrow} />
            ) : (
              <i className="fas fa-arrow-down" onClick={props.fullCardArrow}>
                {" "}
                Read more...
              </i>
            ))}
        </div>
      </StyledCardBody>
      {props.dropDown && (
        <UncontrolledButtonDropdown>
          <StyledDropdownToggle caret size="lg" style={{ margin: "auto" }}>
            {props.dropDownToggleText}
          </StyledDropdownToggle>
          <DropdownMenu>
            {props.dropDown.map((job, index) => (
              <DropdownItem
                key={job.id}
                onClick={() => props.jobSelected(job.id)}
              >
                {job.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      )}
      <CardFooter className="icard-footer">
        {props.btn1 && (
          <StyledButton
            onClick={props.btn1}
            disabled={!props.is_valid}
            btn1={"true"}
          >
            {props.btn1Text}
          </StyledButton>
        )}
        {props.btn2 &&
          (props.confirmAction === true ? (
            <ConfirmSpending
              buttonLabel={props.btn2Text}
              confirmAction={props.btn2}
              disabled={!props.is_validbtn2}
            />
          ) : (
            <StyledButton
              onClick={props.btn2}
              disabled={!props.is_validbtn2}
              btn2={"true"}
            >
              {props.btn2Text}
            </StyledButton>
          ))}
        {props.btn3 &&
          (props.confirmAction === true ? (
            <ConfirmSpending
              buttonLabel={props.btn3Text}
              confirmAction={props.btn3}
              disabled={!props.is_validbtn3}
              id="toggler"
            />
          ) : (
            <StyledButton
              onClick={props.btn3}
              disabled={!props.is_validbtn3}
              btn3={"true"}
            >
              <span id="toggler">{props.btn3Text}</span>
            </StyledButton>
          ))}
        {props.btn4 && (
          <StyledButton onClick={() => props.btn4(props.id)}>
            {props.btn4Text}
          </StyledButton>
        )}
      </CardFooter>

      {props.btn3Hover && (
        <UncontrolledTooltip placement="right" target="toggler">
          {props.btn3Hover}
        </UncontrolledTooltip>
      )}
      {props.outOfCreditAlert && (
        <Link to="/billing">
          <Alert color="danger">{props.outOfCreditAlert}</Alert>
        </Link>
      )}
    </StyledCard>
  );
};

export default ExplicitBaseCard;

// is_valid
