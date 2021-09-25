import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

// import { makeStyles } from '@material-ui/core/styles';
import "./compstyle.css"

// const useStyles = makeStyles({
//   div: {
//     display: 'flex',
//     flexFlow: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     wordWrap: 'break-word',
//   },
//   paragraph: {
//     color: 'white',
//     background: '#222E44',
//     width: '600px',
//     height: '100px',
//     padding:'10px'
//   },
//   card: {
//     maxWidth: 900,
//     maxheight: 900,
//     marginBottom: '100px'
//   },
// });
const Learn = props => {
//   const classes = useStyles();

  return (
    <div className="wholelearn">
        <div className="labbyinfo">

        <p className="labbyp">
          Labby is designed to automate Lambda school’s process of manually assigning incoming student to their teams. The goal of Labby is to save Lambda School hundreds of man hours each year.
        </p>
        </div>


      <Card className="card">
      <CardActionArea>
        <CardMedia
          component="iframe"
          alt="Labby Demo"
          height="315"
          width="550"
          // src={Movie}
          title="Contemplative Reptile"
          // autoplay={false}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Click Play
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Labby is a set of Lambda functions that handle processes involved in running the labs program and interacts with students and staff through a slackbot. AWS Lambda and RDS were used to take advantage of the Separation of Concerns principle. We also took advantage of the Principle of Least Privilege to protect Lambda School’s security concerns.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Meet the Team
        </Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default Learn;