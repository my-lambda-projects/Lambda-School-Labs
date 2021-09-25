import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  UncontrolledTooltip,
  CardColumns
} from "reactstrap";
import { ActionButton } from "./indexCSS";
const ViewElement = props => {
  //console.log("ViewElement data : ", props);
  let photoSrc =
    props.data && props.data.employer && props.data.employer.photo.length > 1
      ? props.data.employer.photo
      : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

  return (
    <React.Fragment>
      <div>
        <Card>
          <CardColumns>
            <Card>
              <CardImg top width="50%" src={photoSrc} alt="Card image cap" />
            </Card>
            <Card>
              <CardBody>
                <CardTitle top width="100%">
                  {props.success && <h1>{props.data.first_name}</h1>}
                </CardTitle>
                <CardText />
              </CardBody>
            </Card>
          </CardColumns>
          <Card>
            <CardBody>
              {props.data && <CardTitle> {props.data.title} </CardTitle>}
              <Button onClick={props.skip}>Skip</Button>
              <Button onClick={props.super}>Super</Button>
              <Button onClick={props.call} id="TooltipExample">
                Call
              </Button>
              <UncontrolledTooltip placement="right" target="TooltipExample">
                you have {props.credit} free credit
              </UncontrolledTooltip>
            </CardBody>
          </Card>
        </Card>
      </div>
      {/* {props.data &&
                 <div>
                    <h1>First-name: <em>{props.data.first_name}</em> <br/>Last-name:  <em>{props.data.last_name} </em></h1>
                    <h2>Title {props.data.is_employer ? " Employer" : "Seeker"} </h2>
                    <h3>email {props.data.email}</h3>
                    <h4>Id {props.data.id}</h4>
                </div>
            }
            <button onClick={props.onClick[1]}>Get seeker</button>
            <button onClick={props.onClick[0]}>Get Employer</button> */}
    </React.Fragment>
  );
};

export default ViewElement;
