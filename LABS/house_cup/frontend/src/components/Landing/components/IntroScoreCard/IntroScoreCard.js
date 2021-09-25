import React, { Component } from 'react';
import './IntroScoreCard.css';

class IntroScoreCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'CS5',
      mascot: 'Tiger',
      color: '#00796b',
      score: 77,
    };
  }

  increaseScore = () => {
    this.setState({
      score: this.state.score + 1,
    });
  }

  decreaseScore = () => {
    this.setState({
      score: this.state.score - 1,
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
    const fontStyleGenerated = this.getFontColor(this.state.color);
    const styles = {
      ScoreCard: {
        color: fontStyleGenerated.color,
        textShadow: fontStyleGenerated.textShadow,
        backgroundColor: this.state.color,
      },
    };
    return (
      <div className="IntroScoreCard">
        <div className="ScoreCard" style={styles.ScoreCard}>
          <div className="ScoreCard__house">
            <div className="ScoreCard__house-name">{this.state.name}</div>
            <div className="ScoreCard__house-mascot">{this.state.mascot}</div>
          </div>
          <div className="ScoreCard__actions">
            <div className="ScoreCard__score">{this.state.score}</div>
          </div>
        </div>
        <div className="ScoreCard" style={styles.ScoreCard}>
          <div className="ScoreCard__house">
            <div className="ScoreCard__house-name">{this.state.name}</div>
            <div className="ScoreCard__house-mascot">{this.state.mascot}</div>
          </div>
          <div className="ScoreCard__actions">
            <button
              className="ScoreCard__button ScoreCard__button--decrement"
              onClick={() => this.decreaseScore()}
            />
            <div className="ScoreCard__score">{this.state.score}</div>
            <button
              className="ScoreCard__button ScoreCard__button--increment"
              onClick={() => this.increaseScore()}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default IntroScoreCard;
