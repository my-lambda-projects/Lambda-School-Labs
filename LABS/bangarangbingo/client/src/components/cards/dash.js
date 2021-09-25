import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCards } from '../../actions';
import Layout from '../layout';

class Dash extends Component {
  componentDidMount() {
    this.props.getCards();
  }

  render() {
    const { props } = this;

    return (
      <Layout logout={props.logout}>
        <div className="root">
          <header>
            <span>Welcome!</span>
            <Link to="/card/create">Create Cards</Link>
          </header>
          <section className="content">
            <div className="cards">{!!props.cards.length && props.cards.map(card => (
              <Link to={`card/edit/${card._id}`} key={card._id} className="card-link">{card.title}</Link>
              ))}
            </div>
            {!props.cards.length &&
              <Link to="/card/create" className="empty">
                <span>You don't have any bingo cards!</span>
                <span>Click to get started!</span>
              </Link>
            }
          </section>
          <style jsx scoped>
            {`
          .root {
            background: #ffffff;
            max-width: 1440px;
            margin: 0 auto;
            box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 4px;
          }
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;        
          }
          header :global(a) {
            text-decoration: none;
            background: #239999;
            color: #fff;
            padding: 10px 20px;
          }
          .content :global(.empty) {
            display: block;
            padding: 75px;
            background: #eaeaea;
            text-align: center;
            text-decoration: none;
            color: #000;
          }
          .content :global(.empty span) {
            display: block;
            padding: 5px;
          }
          .content :global(.card-link) {
            display: block;
          }
          .cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            background: #249999;
            padding: 20px;


          }
          .cards :global(.card-link) {
            min-width: 250px;
            padding: 10px 25px;
            box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            width: 300px;
            border: 2px solid #125454;
            text-decoration: none;
            color: #125454;
            background: #fff;
        }
        
          }
          `}
          </style>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
});

export default connect(mapStateToProps, { getCards })(Dash);
