import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Header, Form, Segment, Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { withFirebase } from './firebase';
import { addAllergy, getAllergies, deleteAllergy, autoComIng, resetAutoCom } from '../actions/index';
import PasswordChangeForm from './auth/passwordChange';
import ourColors from '../ColorScheme.js';

const AutoComItemsDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 35px;
  border: 1px solid #d4d4d4;
  z-index: 10;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
    height: 25px;
    padding-left: 13.7px;
  }
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      allergy: '',
      allergyInputFocus: false
    };
  }
  componentDidMount() {
    this.props.getAllergies();
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.autoComIng(event.target.value);
  };
  onAddAllergy = e => {
    this.props.addAllergy(this.state.allergy.toLowerCase());
    this.setState({ allergy: '' });
    this.blurField();
  };
  focusField = () => {
    this.setState({ allergyInputFocus: true });
  }
  blurField = () => {
    setTimeout( () => this.setState({ allergyInputFocus: false }),
    100);
  }
  onClickAutocomplete = (item) => {
    console.log(item);
    this.props.addAllergy(item.toLowerCase());
    this.setState({ allergy: '' });
    this.props.resetAutoCom(); // resets autoCom so menu will disappear
    this.blurField();
  }

  render() {
    if (this.props.allergies) {
      return (
        <div>
          <Header as='h1'>Settings</Header>
          {localStorage.getItem('uid') && <PasswordChangeForm />}
          <Header
            as='h3'
            color='black'
            // inverted
            attached='top'
            style={{ width: '70%', marginLeft: '15%' }}
          >
            Allergies
          </Header>
          <Segment attached style={{ width: '70%', marginLeft: '15%' }}>
            <ul>
              {this.props.allergies.map((allergy, i) => {
                if (typeof allergy === 'object') {
                  return (
                    <li key={i}>
                      {allergy.name}{' '}
                      <Icon
                        onClick={() => this.props.deleteAllergy(allergy.name)}
                        name="delete"
                        style={{ color: ourColors.warningColor }}
                      />
                    </li>
                  );
                } else {
                  return (
                    <li key={i}>
                      {allergy}{' '}
                      <Icon
                        onClick={() => this.props.deleteAllergy(allergy)}
                        name="delete"
                        style={{ color: ourColors.warningColor, cursor: 'pointer' }}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Segment>
          <Segment
            style={{ width: '70%', marginLeft: '15%', background: ourColors.formColor }}
          >
            <Form autoComplete='off'>
              <Form.Field>
                {/* changed button into Icon
          also put Icon inside of Input as action */}

                <Input
                  size='mini'
                  type='text'
                  name='allergy'
                  id='allergy'
                  placeholder='Please enter an allergy...'
                  value={this.state.allergy}
                  onChange={this.onChange}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  action={
                    <Icon
                      name='add circle'
                      onClick={this.onAddAllergy}
                      style={
                        !localStorage.getItem('uid')
                          ? {
                              color: ourColors.inactiveButtonColor,
                              cursor: 'pointer',
                              margin: '4.5px 5px 0'
                            }
                          : { color: ourColors.buttonColor, cursor: 'pointer', margin: '4.5px 5px 0' }
                      }
                      disabled={!localStorage.getItem('uid')}
                      size='big'
                      // style={{ cursor: 'pointer' }}
                    />
                  }
                  actionPosition='right'
                />
                { this.props.autoCom && this.state.allergyInputFocus && (
                  <AutoComItemsDiv>
                    {this.props.autoCom.map(item => {
                      return (
                        <div
                          key={item}
                          onClick={ev => this.onClickAutocomplete(item)}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </AutoComItemsDiv>
                )}
              </Form.Field>
            </Form>
          </Segment>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    autoCom: state.nutritionReducer.autoComIng,
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { addAllergy, getAllergies, deleteAllergy, autoComIng, resetAutoCom }
)(compose(withFirebase)(Settings));
