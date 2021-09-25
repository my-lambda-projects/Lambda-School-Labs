import styled from "styled-components";

export const UserCardContainer = styled.div`
  border-radius: 5px;
  border: lightgrey solid 1px;
  background: white;
  height: ${props => (props.expanded ? null : null)}px;
  /* height: ${props => (props.expanded ? null : 'auto')}; */
  min-height: ${props => (props.expanded ? 700 : null)}px;
  width: 520px;
  margin-bottom: 30px;
  /* padding-bottom: 20px; */
  margin-right: 30px;
  a {
    color: black;
  }
  .skillsdelete {
      :hover {
        background: lightgrey;
        border-radius: 3px;
      }
      display: flex;
      align-items: center;
      .fa-times-circle {
        color: coral;
        cursor: pointer;
      }
    }
  .userCardDiv {
    /* border: 1px solid yellow; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      /* border: 1px solid blue; */
      .left-side {
        width: 90%;
        overflow: hidden;
        height: 100%;
        padding-top: 20px;
        margin-left: 28px;
        h2 {
          font-size: 30px;
        }
        h3 {
          font-size: 22px;
          padding: 5px 5px;
          border-top: 1px solid lightgrey;
          border-bottom: 1px solid lightgrey;
        }
        .bio {
          display: flex;
          flex-direction: row;
          margin: 0;
          p {
            font-size: 13px;
            margin: 3px;
          }
          .user-intro {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 10px 0 10px 10px;
            width: 70%;
          }
          .location {
            color: var(--accent-color);
            padding: 5px 0;
          }
          .photo {
            background: var(--accent-color);
            display: flex;
            border-radius: 100px;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            background-image: cover;
            margin: 10px;
            margin-left: 0;
          }
        }
        .keywords {
          display: flex;
          /* border: 1px solid green; */
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 10px, 0;
          margin-top: 20px;
          margin-bottom: 0px;
          max-height: 100px;
          overflow: auto;
          .keyword {
            padding: 1px;
            margin: 2px;
          }
          .topskill {
            font-size: 16px;
            font-weight: bold;
          }
          .addskill {
            font-size: 16px;
          }
          .famskill {
            font-size: 14px;
          }
        }
      }
      .links {
        /* border: 1px solid green; */
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 15%;
        height: 300px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 0;
        .fab,
        .fas {
          font-size: 25px;
          &:hover {
            color: gray;
          }
          cursor: pointer;
        }
        .fas {
          font-size: 20px;
          margin-bottom: 40px;
        }
        .badge {
          width: 50px;
          margin-top: 25px;
          cursor: pointer;
        }
      }
    }
  }
  .bottom {
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    overflow: hidden;
    &:hover{
      background-color: #ee6c4d;
    }
  }
  .fa-laptop {
    font-size:50px;
  }
  .projects-etc {
    margin-left: 28px;
    h2 {
      font-size: 22px;
      padding: 5px 5px;
      margin-bottom: 15px;
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      max-width: 465px;
    }
    a {
      margin-left: 5px;
    }
    .project-top{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .project-right{
      display: flex;
      flex-direction: column;
      i {
        padding: 5px;
        &:hover{
          ${props => {
          if(props.canEdit){
            return ('color: #ee6c4d; cursor: pointer')
          } else {
            return null;
          }
          }};
        }  
      }
    }
    
  }
  .proj-image-container {
    img {
      border-radius: 3px;
    }
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .proj-etc-container {
    margin-bottom: 20px;
    margin-right: 28px;
    
  }
  .extratitle {
    font-size: 20px;
    font-weight: bold;
    padding-left: 5px;
    margin-bottom: 5px;
  }
  .dates {
    font-size: 15px;
    margin: 5px 0 0 10px;
    color: grey;
  }
  .description {
    width: 250px;
    padding-left: 10px;
    word-break:break-all;
  }
  .indent {
    margin-left: 5px;
  }
  .fa-caret-down {

  }
  @media (max-width: 1440px) {
       margin-right: 0;
   }
   @media (max-width: 480px) {
        transform: scale(.7);
    }
`;

export default UserCardContainer;