import React from 'react';
// import { Progress } from 'reactstrap';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const ScoreBoard = (props) => {
  let questionsTotal = props.race.questions.length;
  const { classes } = props;
  return (
    <div className="scoreboard">
      <Paper className={classes.root} elevation={4}>

      {props.gotRace ? props.race.teams.map(team => {
        // let progress = (team.score / (team.students.length * questionsTotal)) * 100;
        return <div key={team.id}>{team.name} 
        <Progress percent={(team.score / (team.students.length * questionsTotal)) * 100} theme={{success: {
          symbol: team.mascot,
          color: team.color
        }, 
        active: {
          symbol: team.mascot,
          color: team.color
        }, 
        default: {
          symbol: team.mascot,
          color: team.color
        }
      }} /> </div>}) : null}
      </Paper>
  </div>
  )
}

ScoreBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ScoreBoard);