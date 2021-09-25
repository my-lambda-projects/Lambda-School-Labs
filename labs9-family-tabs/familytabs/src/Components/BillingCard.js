import React from "react";
import styled from "styled-components";
import Checkout from "./Checkout";
// import { StyledCard } from "./styled/components";

// const BillingWrapper = styled.div`
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.div`
//   text-align: left;
//   font-size: 20px;
//   margin: 30px 0px 30px 0px;
// `;
// const Content = styled.p`
//   text-align: left;
//   margin: 30px 0px 60px 0px;
// `;
// const ButtonWrapper = styled.div`
//   width: 50%;
//   margin-left: -12%;
// `;


const StyledCard = styled.div`
    width: 500px;
    background: #242943;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border: 2px solid #d4b36e;
    padding: 20px 20px 30px 20px;
    margin: 50px 0 0 0 0;
    h2 {
      font-family: "Merriweather", sans-serif;
      font-size: 22px;
      color: white;
      margin: 30px 0 20px;
      line-height:1.5;
    }
    p{
      font-size:18px;
      color:white;
      margin:15px 25px;;
      line-height:1.5;
      text-align:left;
    }
    .button-box {
      width: 400px;
      margin: 0 auto;
      display: flex;
      justify-content:${ props=> props.spaceBetween ?'space-between':'center'};

      a {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
       padding: 0 10px;
        height: 25px;
        text-decoration: none;
        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
      button {
        color: white;
    background: #242943;
    border: 2px solid #ffffff; 
    padding: 15px 50px 15px 50px;
    margin: 30px 0 0 0;
    width: 250px; 
    height: 50px;
    margin-right: 5px;
    :hover {
    border-color: #3985ac;
    color: #3985ac;
    cursor: pointer;
        }
      }
    }
  
`

const BulletPoints = styled.div `
    margin: 0px 0px 20px 40px;


`;




class BillingCard extends React.Component {
  subscribe=()=>{
      console.log('click')
  }
    render() {
    return (
      <StyledCard>
        {this.props.isSubscribed ? (
          <h2>Thanks for subscribing!</h2>
        ) : (
          <>
            <h2>FAMILY TABS PREMIUM</h2>

            <p>
              For only $9.99 a month, the premium account includes:
            </p>
            <BulletPoints>
              <p> - Three admin accounts</p> 
               <p>- Unlimited amount of child accounts.</p>
               </BulletPoints>
            <p>
              With Family Tabs Premium, it's even easier to keep tabs on the
              whole family.
            </p>

            <div className="button-box">
              <Checkout
              familyID={ this.props.familyID }
              loadAPIProfile={this.props.loadAPIProfile}
                name={"Family Tabs"}
                description={"Monthy Subscription"}
                amount={9.99}
              />
            </div>
          </>
        )}
      </StyledCard>
    );
  }
}
export default BillingCard;
