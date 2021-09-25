import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import Carousel from './Carousel'

const useStyles = makeStyles({
  card: {
    width: '500px',
//     height: '300px',
    margin: '5px auto 50px',
    backgroundColor: '#222E44',
    wordWrap: 'break-word',
    color: 'white',
  },
  bullet: {
    display: 'inline-block',
    margin: '30px auto',
    transform: 'scale(0.8)',
    border: '3px solid red'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    width: '247px',
    background: '#33B2DD',
    color: 'black',
    margin: '100px'
  }
});

const Team = props => {
  const classes = useStyles();

  return (
    <div>
     <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" className={classes.paragraph}>
            Our team consists of seven amazing Lambda School students and one Team Lead. The team worked effectively together to learn about and understand how to work with AWS. AWS services were new to our team and we had to adopt a flexible work style to adjust to all the information we learned. 

        </Typography>
        </CardContent>     
    </Card> 

    <Carousel />

    </div>
  );
};

export default Team;

