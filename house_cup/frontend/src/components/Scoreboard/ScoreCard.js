import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';

class ScoreCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      auth: {...props.auth},
    });
  }

  increaseScore = () => {
    this.changeScore(1);
  }

  decreaseScore = () => {
    this.changeScore(-1);
  }

  changeScore = (change) => {
    // Sends Request to update score
    this.props.socket.emit('updateScoreRequest', {
      _id: this.props.house._id,
      scoreChange: change,
      Authorization: localStorage.getItem('token'),
    });
  }

  getFontColor = (backgroundColor) => {
    // Returns Font-color
    // based on the luminance of Background-color
    if (new RegExp(/[^a-f0-9#]/gi).test(backgroundColor)) {
      // invalid Hex
      return {
        color: 'rgb(0, 0, 0)',
        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.35)',
      };
    }
    const hexColor = backgroundColor.replace(/#/gi, '');
    // values constant that determines the luminance
    const factor = {
      R: 0.299,
      G: 0.587,
      B: 0.114,
    };
    const midPoint = 100;
    // Convert Hex into rgb array
    const rgb = Array.from(hexColor).reduce((rgbArray, hexDigit, index, hexDigitsArray) => {
      if (index % 2 === 0) {
        const hexValue = hexDigit + hexDigitsArray[index + 1];
        rgbArray.push(parseInt(hexValue, 16));
      }
      return rgbArray;
    }, []);

    const luminance = (rgb[0] * factor.R) + (rgb[1] * factor.G) + (rgb[2] * factor.B);

    return {
      color: (luminance >= midPoint) ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
      textShadow: (luminance >= midPoint) ? '1px 1px 2px rgba(255, 255, 255, 0.35)' : '1px 1px 5px rgba(0, 0, 0, 0.25)',
    };
  }

  render() {
    const { house } = this.props;
    const fontStyleGenerated = this.getFontColor(house.color);
    const styles = {
      ScoreCard: {
        color: fontStyleGenerated.color,
        textShadow: fontStyleGenerated.textShadow,
        backgroundColor: house.color,
      },
    };

    return (
      <div className="ScoreCard" style={styles.ScoreCard}>
        <div className="ScoreCard__house">
          <div className="ScoreCard__house-name">{house.name}</div>
          <div className="ScoreCard__house-mascot">{house.mascot}</div>
        </div>
        <div className="ScoreCard__actions">
          {
            (this.props.auth.isTeacher && !this.props.public) ? (
              <button
                className="ScoreCard__button ScoreCard__button--decrement"
                onClick={() => this.decreaseScore()}
              />
            ) : null
          }
          <div className="ScoreCard__score">{house.score}</div>
          {
            (this.props.auth.isTeacher && !this.props.public) ? (
              <button
                className="ScoreCard__button ScoreCard__button--increment"
                onClick={() => this.increaseScore()}
              />
            ) : null
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles })(ScoreCard));
