import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import TagCloud from "react-tag-cloud";
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
import { TweenMax } from "gsap/TweenMax";

const ShowFullCard = styled.div`
  display: ${props => (props.is_open ? "block" : "none")};
`;
const StyledH5 = styled.h5`
  padding: ${props => (props.is_seeker ? "0px 9%" : "0 0")};
  text-align: ${props => (props.is_seeker ? "left" : "center")};
`;

const StyledButton = styled(Button)`
  // background-color: #207ccae8;
  // color: #444444;
  width: 48px !important;
  height: 48px !important;
  padding: 5px !important;
  border-radius: 50%;
  box-sizing: border-box;
  transition: all;
  i {
    font-size: 26px !important;
  }
`;

const StyledCompanyName = styled.h1`
  margin-bottom: 12px;
`;

const StyledSkilledDiv = styled.div`
  margin-top: 20px;
`;
const backdrop = keyframes`
    from{
         box-shadow: 1px 1px 15px #a8419b;
    }
    to{
        box-shadow: 1px 1px 15px #3160f5;
    }
`;
const StyledCard = styled(Card)`
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => (props.width ? "400px" : "auto")};
  background-color: #27293d;
  color: white;
  margin: 0px auto;
  text-align: start;
  border-radius: 0;
  // border-left: 10px solid #3358f4;
  padding: 20px 20px;
  border: 1px solid #81818142;
  border-radius: 10px;
  overflow: hidden;
  i {
    cursor: pointer;
    &:hover {
      color: #207ccae8;
    }
  }
  @media (min-width: 900px) {
    margin: 10px 5px;
    margin: 10px auto;
  }
`;
const moveUp = keyframes`
    0%{
        top: 0px;
        border-bottom: "1px solid #1e1e2f";
    }
    40%{
        top: -7px;
        border-bottom: "7px solid #1e1e2f"
    }
    80%{
        top: -7px;
    }
    100%{
        top: 0px;
        border-bottom: "1px solid #1e1e2f";
    }
`;
const moveDown = keyframes`
    0%{
        top: 0px;
        border-bottom: "7px solid #1e1e2f"
    }
    40%{
        top: -7px;
        border-bottom: "1px solid #1e1e2f";
    }
    80%{
        top: -7px;
    }
    100%{
        top: 0px;
        border-bottom: "7px solid #1e1e2f"
    }
`;

const CardHeader = styled.div`
  // position: relative;
  // width: 100%;
  // height:  ${props => (props.height ? "80px" : "100px")};
  // display: flex;
  // border-bottom: 1px solid #4a4a4a;
  // border-top: 1px solid #4a4a4a;
  // // border-radius: 20px;
  // padding: 10px;
  // background-color: #27293d;
  // margin-bottom: 5px;
  //
  // animation: ${props => (props.is_open ? moveUp : moveDown)};
  // animation-duration: 2s;
  // transition: animation 0.4s ease;
  //
  // img {
  //   width: auto;
  //   height: 90%;
  //   border-radius: 50%;
  //   padding: 2px;
  //   margin: auto;
  //   border: 1px solid #4a4a4a;
  // }
  // div {
  //   flex: 1;
  //   margin: auto;
  //   margin-left: 20px;
  // }
  // h6 {
  //   overflow: scroll;
  //   font-size: 12px;
  //   font-weight: 500;
  //   text-transform: unset;
  // }
`;
const StyledCardBody = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.height ? props.height : "200px")};
  padding: 10px 30px;
  text-align: start;
  // border-top: 1px solid white;
  margin-top: 10px;
  padding-top: 10px;
  background-color: transparent;
  transform-style: preserve-3d;
  perspective: 2000px;
  transition: all 0.8s;

  .front {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 200px;
    width: 100%;
    padding: 10px 30px;
    backface-visibility: hidden;
    background-color: #27293d;
    transform: ${props =>
      props.is_open ? "rotateX(-180deg)" : "rotateX(10deg)"};
    transition: all 1s;
    transition-delay: 0.5s;
    overflow: hidden;
    // border-bottom: 1px solid white;
    // border-radius: 20px;
    z-index: 100px;
    font-weight: 300;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 200px;
    padding: 10px 30px;
    backface-visibility: hidden;
    background-color: #27293d;
    transform: ${props =>
      props.is_open ? "rotateX(-1deg)" : "rotateX(180deg)"};
    transition: all 1s;
    transition-delay: 0.5s;
    // border-top: 1px solid white;
    // border-radius: 20px;
    z-index: 100px;
    overflow: hidden;
  }
`;
const CardFooter = styled.div`
  padding-top: 10px;
  // border-top: 1px solid white;
  // margin-top: 100px;
  .info {
    font-size: 13px !important;
    transition: all 0.3s;
    text-align: end;
    cursor: pointer;
    margin: 10px auto;
    span {
      border: 1px solid #81818142;
      padding: 10px;
    }
    // width: 100px;
  }
  &:first-child {
    display: block;
    margin: auto;
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    padding: 20px 0 10px 0;
    border-top: 1px solid #4e4e4e;
  }
`;

const StyledCardTitle = styled.p`
  font-size: 18px;
  text-transform: capitalize;
  text-decoration: none;
  font-weight: 600;
`;

class ExplicitBaseCard extends React.Component {
  componentWillEnter(cb) {
    console.log("componentWillEnter");
    this.gsapAnimeIn(cb);
  }

  componentWillLeave(cb) {
    console.log("componentWillLeave");
    this.gsapAnimeOut(cb);
  }

  gsapAnimeIn = cb => {
    let el = document.getElementById("baseCard");

    // var tl = new TweenMax();
    console.log(this);
    TweenMax.from(el, 1, {
      rotation: "-1deg",
      right: "15%",
      bottom: "40px",
      opacity: 0,
      onComplete: () => cb()
    });
  };
  gsapAnimeOut = cb => {
    let el = document.getElementById("baseCard");
    TweenMax.to(el, 1, {
      left: "100%",
      bottom: "100px",
      rotation: "50deg",
      opacity: 0,
      onComplete: () => {
        cb();
        this.props.animationOnComplete();
      }
    });
  };
  render() {
    // console.log("ExplicitBaseCard", {props});
    let { props } = this;
    return (
      <StyledCard width={props.width} id={"baseCard"}>
        {/************************** CardHeader starts *******************************/}

        <CardHeader
          className="styled-card-header card-user"
          is_open={props.is_open}
          height={props.height}
          onClick={props.toggle}
        >
          {/*<CardImg*/}
          {/*src={*/}
          {/*props.photo ||*/}
          {/*"https://images.unsplash.com/photo-1527605555-b01c458b8029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"*/}
          {/*}*/}
          {/*alt="Card image cap"*/}
          {/*/>*/}
          {/*<div>*/}
          {/*<StyledH5 is_seeker={props.is_seeker}>{props.name}</StyledH5>*/}
          {/*<span>{props.summary}</span>*/}
          {/*</div>*/}
          <div className="author">
            <div className="block block-one" />
            <div className="block block-two" />
            <div className="block block-three" />
            <div className="block block-four" />
            <a href="#pablo" onClick={e => e.preventDefault()}>
              <img
                alt="..."
                className="avatar"
                src={props.photo || require("assets/img/anime3.png")}
              />
              <StyledCompanyName className="title">
                {props.name}
              </StyledCompanyName>
              <StyledH5 is_seeker={props.is_seeker}>{props.summary}</StyledH5>
            </a>
          </div>
        </CardHeader>
        {/************************** CardHeader ends *******************************/}

        {/************************** StyledCardBody starts *******************************/}
        <StyledCardBody
          className="card-body"
          is_open={props.is_open}
          height={props.height}
        >
          <div className="front">
            <StyledCardTitle className="icard-title">
              {props.title}
            </StyledCardTitle>
            <StyledSkilledDiv>
              {props.skills && (
                <li>
                  {" "}
                  {props.skills.map((skill, i) => (
                    <span key={i * Date.now()}>{skill} </span>
                  ))}
                </li>
              )}
              {props.extra_skills && (
                <li>
                  {" "}
                  {props.extra_skills.map((skill, i) => (
                    <span key={Math.random() * i * Date.now()}>{skill} </span>
                  ))}
                </li>
              )}
              {props.familiar_with && (
                <li>
                  {" "}
                  {props.familiar_with.map((skill, i) => (
                    <span key={Math.random() * i * Date.now()}>{skill} </span>
                  ))}
                </li>
              )}
            </StyledSkilledDiv>
            {/*ShowFullCard
            Usage: this styled component is useful if you have data that needs to display conditionally.
            props:
                is_open={boolean}
                experience={string}
                salary_min={string}
                salary_max={string}
                education={string}
                description={string}
                requirements={string} */}
          </div>
          <div className="back">
            <ShowFullCard is_open={true} className="showfullcard">
              {props.experience && (
                <CardBody>
                  {" "}
                  <CardTitle>Experience: </CardTitle>{" "}
                  <CardText> {props.experience}</CardText>
                </CardBody>
              )}
              {props.education && (
                <CardBody>
                  <CardTitle> Education: </CardTitle>{" "}
                  <CardText> {props.education}</CardText>{" "}
                </CardBody>
              )}
              {props.salary_min && (
                <CardBody>
                  <CardTitle>Salary-min: </CardTitle>
                  <CardText>{props.salary_min}</CardText>
                </CardBody>
              )}
              {props.salary_max && (
                <CardBody>
                  <CardTitle>Salary-max: </CardTitle>{" "}
                  <CardText> {props.salary_max}</CardText>
                </CardBody>
              )}
              {props.description && (
                <CardBody>
                  <CardTitle>Description: </CardTitle>{" "}
                  <CardText>{props.description}</CardText>
                </CardBody>
              )}
              {props.requirements && (
                <CardBody>
                  <CardTitle> Requirements: </CardTitle>{" "}
                  <CardText>{props.requirements}</CardText>
                </CardBody>
              )}
            </ShowFullCard>
          </div>
        </StyledCardBody>
        {/************************** StyledCardBody ends *******************************/}

        {/************************** Card footer starts *******************************/}
        <CardFooter className="icard-footer">
          <div className={"info"}>
            {props.is_expandable &&
              (props.is_open ? (
                <span onClick={props.fullCardArrow}>Read less...</span>
              ) : (
                <span onClick={props.fullCardArrow}>Read more...</span>
              ))}
          </div>
          {props.dropDown && (
            <UncontrolledButtonDropdown>
              <DropdownToggle
                className={"btn-simple active"}
                aria-expanded={true}
              >
                {props.dropDownToggleText}
              </DropdownToggle>
              <DropdownMenu className="dropdown-black">
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

          {/*
          Button one
                bt1={boolean} // beta-version | A prop for styled-components to personalize some default css
            props:
                is_valid={boolean}
                bt1={func}
                bt1Text={string}
          */}
          <div className="buttons">
            {props.btn1 && (
              <StyledButton
                onClick={props.btn1}
                disabled={!props.is_valid}
                btn1={"true"}
                color={props.btn1color}
                className={props.btn1ClassName}
                size={props.btnSizeForAll}
                name={props.btn1Name}
              >
                {props.btn1Text}
                <i className={props.btn1Icon} />
              </StyledButton>
            )}

            {/*
                Button two

                props:
                    confirmAction={boolean} // used to render <ConfirmSpending /> or <StyledButton />
                    is_validbtn2={boolean}
                    onClick={func}
                    bt2={boolean} // beta-version | using for styled-components to personalize some default css
                    bt2Text={string}
            */}

            {props.btn2 &&
              (props.confirmAction === true ? (
                <ConfirmSpending
                  buttonLabel={props.btn2Text}
                  confirmAction={props.btn2}
                  disabled={!props.is_validbtn2}
                  color={props.btn2color}
                  size={props.btnSizeForAll}
                  className={props.btn2ClassName}
                  btn2Icon={props.btn2Icon}
                />
              ) : (
                <StyledButton
                  onClick={props.btn2}
                  disabled={!props.is_validbtn2}
                  btn2={"true"}
                  color={props.btn2color}
                  className={props.btn2ClassName}
                  size={props.btnSizeForAll}
                  name={props.btn2Name}
                >
                  {props.btn2Text}
                  <i className={props.btn2Icon} />
                </StyledButton>
              ))}

            {/*
            Button three
             Usage:
                This button can be useful if you want on hover effect over the button.
                 ConfirmSpending component have its own state, and modal at the moment. For more info, its under feature/billing
            props:
                confirmAction={boolean} // used to render <ConfirmSpending /> or <StyledButton />
                is_validbtn3={boolean}
                btn3={func}
                btn3Text={string}
                id={number} //unique id number using for <UncontrolledTooltip />
            */}
            {props.btn3 &&
              (props.confirmAction === true ? (
                <ConfirmSpending
                  buttonLabel={props.btn3Text}
                  confirmAction={props.btn3}
                  disabled={!props.is_validbtn3}
                  id="button3"
                  color={props.btn3color}
                  size={props.btnSizeForAll}
                  className={props.btn3ClassName}
                  btn2Icon={props.btn3Icon}
                />
              ) : (
                <StyledButton
                  onClick={props.btn3}
                  disabled={!props.is_validbtn3}
                  btn3={"true"}
                  color={props.btn3color}
                  className={props.btn3ClassName}
                  size={props.btnSizeForAll}
                  id="button3"
                >
                  {props.btn3Text}
                  <i className={props.btn3Icon} />
                </StyledButton>
              ))}
            {/*
                Button four
                Usage:
                    This button can be useful if you want onclick event listener that return a given props Id.
                props:
                    confirmAction={boolean} // used to render <ConfirmSpending /> or <StyledButton />
                    btn4={func} // onClick event listener that return props.id
                    btn4Text={string}
            */}

            {props.btn4 && (
              <StyledButton
                onClick={() => props.btn4(props.id)}
                btn3={"true"}
                color={props.btn4color}
                className={props.btn4ClassName}
                size={props.btnSizeForAll}
                id="button4"
              >
                {props.btn4Text}
                <i className={props.btn4Icon} />
              </StyledButton>
            )}
          </div>
        </CardFooter>
        {/************************** Card footer ends *******************************/}

        {/*
            UncontrolledTooltip:
            props:
                btn3Hover={string}

        */}
        {props.btn3Hover && (
          <UncontrolledTooltip placement="right" target="button3">
            {props.btn3Hover}
          </UncontrolledTooltip>
        )}
        {/*
            Alert: used to display alert component from reactStrap
            props:
                outOfCreditAlert={string}

        */}
        {props.outOfCreditAlert && (
          <Link to="/billing">
            <Alert color="danger">{props.outOfCreditAlert}</Alert>
          </Link>
        )}
      </StyledCard>
    );
  }
}

export default ExplicitBaseCard;
