import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SignUpForm, SignInForm, } from '../../presentation/presentation.js';
import { appUrl, gitHubOAuthUrl, googleOAuthUrl,  } from '../../../constants.js';

class UserAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderForm: this.props.renderForm,
      signInForm: {
        loading: false,
      },
      signInEmailInput: {
        value: '',
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: 'Test label',
          hidden: true,
        },
        loading: false,
        isValid: false,
      },
      signInPasswordInput: {
        value: '',
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: 'Test label',
          hidden: true,
        },
        loading: false,
        isValid: false,
      },
      signInButton: {
        disabled: true,
      },
      signUpUsernameInput: {
        value: '',
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: '',
          hidden: true,
        },
        loading: false,
        isValid: false,
      },
      signUpEmailInput: {
        value: '',
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: '',
          hidden: true,
        },
        loading: false,
        isValid: false,
      },
      signUpPasswordInput: {
        value: '',
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: '',
          hidden: true,
        },
        loading: false,
        isValid: false,
      },
      signUpReTypePasswordInput: {
        value: '',
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: '',
          hidden: true,
        },
        loading: false,
        isValid: false,
      },
      registerButton: {
        disabled: true,
      }
    };
  }

  handleError = (name, error, message = '') => {

    const { value, } = this.state[name];

    if (error) {
      this.setState({
        [name]: {
          value,
          error,
          icon: {
            name: 'close',
            color: 'red',
          },
          label: {
            value: message,
            hidden: false,
          },
          loading: false,
        } 
      })
    } else {
      this.setState({
        [name]: {
          value,
          error,
          icon: {
            name: '',
            color: 'black',
          },
          label: {
            value: '',
            hidden: true,
          },
          loading: false,
        }
      })
    }


    
  }

  handleLabel = (name, labelValue, hidden) => {

    const { error, value, icon, } = this.state[name];

    this.setState({
      [name]: {
        value,
        error,
        icon,
        label: {
          value: labelValue,
          hidden,
        }
      }
    })



  }

  checkEmail = (email, done) => {
    setTimeout(() => {
      axios({
        method: 'post',
        url: appUrl + '/api/users/email-check',
        data: { email, },
      }).then(res => {
        const { isValid, message } = res.data;
        done(isValid, message);
      }).catch(console.log);
    }, 200);
  }

  checkPassword = (email, password, done) => {
    setTimeout(() => {
      axios({
        method: 'post',
        url: appUrl + '/api/users/password-check',
        data: { email, password, }
      }).then(res => {
        const { isValid, message, } = res.data;
        done(isValid, message);
      }).catch(console.log);
    }, 200);
  }

  checkUsername = (username, done) => {
    setTimeout(() => {
      axios({
        method: 'post',
        url: appUrl + '/api/users/username-check',
        data: { username, }
      }).then(res => {
  
        const { inUse, message, } = res.data;
  
        done(inUse, message);
  
      }).catch(console.log);
    }, 200);
  }

  validateUsername = (username, done) => {
    axios({
      method: 'post',
      url: appUrl + '/api/users/username-validate',
      data: { username, }
    }).then(res => {

      const { isValid, message, } = res.data;

      done(isValid, message);

    }).catch(console.log);
  }

  validatePassword = (password, done) => {
    setTimeout(() => {
      axios({
        method: 'post',
        url: appUrl + '/api/users/password-validate',
        data: { password, }
      }).then(res => {

        const { isValid, message } = res.data;

        done(isValid, message);

      }).catch(console.log);
    }, 200);
  }

  validateEmail = (email, done) => {
    axios({
      method: 'post',
      url: appUrl + '/api/users/email-validate',
      data: { email, }
    }).then(res => {

      const { message, isValid, } = res.data;

      done(message, isValid);
    }).catch(console.log);
  }

  handleBlur = e => {

    const name = e.target.name;
    const inputValue = this.state[name].value;

    const { value, error, icon, label, loading, } = this.state[name];

    if (inputValue === '') {
      this.handleError(name, true, 'Please enter a value');
    } else {

      this.setState({
        [name]: {
          value,
          error: false,
          label: {
            value: '',
            hidden: true,
          },
          icon,
          loading: true,
        }
      });

      switch (name) {
        case 'signInEmailInput':

          const email = this.state.signInEmailInput.value;

          this.checkEmail(email, (isValid, message) => {
            if (isValid) {
              this.setState({
                [name]: {
                  value,
                  error: false,
                  label: {
                    value: '',
                    hidden: true,
                  },
                  icon: {
                    name: 'check',
                    color: 'green',
                  },
                  loading: false,
                  isValid: true,
                }
              })
            } else {
              this.setState({
                [name]: {
                  value,
                  error: true,
                  label: {
                    value: message,
                    hidden: false,
                  },
                  icon: {
                    name: 'close',
                    color: 'red',
                  },
                  loading: false,
                  isValid: false,
                }
              })
            }
          });
          break;
        case 'signInPasswordInput':

          const userEmail = this.state.signInEmailInput.value;
          const password = this.state.signInPasswordInput.value;

          this.checkPassword(userEmail, password, (isValid, message) => {
            if (isValid) {
              this.setState({
                [name]: {
                  value,
                  error: false,
                  label: {
                    value: '',
                    hidden: true,
                  },
                  icon: {
                    name: 'check',
                    color: 'green',
                  },  
                  loading: false,
                  isValid: true,
                }
              });
            } else {
              this.setState({
                [name]: {
                  value,
                  error: true,
                  label: {
                    value: message,
                    hidden: false,
                  },
                  icon: {
                    name: 'close',
                    color: 'red',
                  },
                  loading: false,
                  isValid: false,
                }, 
                signInButton: {
                  disabled: true,
                }
              });
            }
          })
          break;
        case 'signUpEmailInput':

          const signUpEmail = this.state.signUpEmailInput.value;

          this.checkEmail(signUpEmail, (inUse, message) => {

            if (inUse) {
              this.setState({
                [name]: {
                  value,
                  error: true,
                  label: {
                    value: message,
                    hidden: false,
                  },
                  icon: {
                    name: 'close',
                    color: 'red',
                  },
                  loading: false,
                  isValid: false,
                }
              })
            } else {

              this.validateEmail(signUpEmail, (message, isValid) => {

                if (isValid) {
                  this.setState({
                    [name]: {
                      value,
                      error: false,
                      label: {
                        value: '',
                        hidden: true,
                      },
                      icon: {
                        name: 'check',
                        color: 'green',
                      },
                      loading: false,
                      isValid: true,
                    }
                  });
                } else {
                  this.setState({
                    [name]: {
                      value,
                      error: true,
                      label: {
                        value: message,
                        hidden: false,
                      },
                      icon: {
                        name: 'close',
                        color: 'red',
                      },
                      loading: false,
                      isValid: false,
                    }
                  });
                }

              });
            }
          });
          break;
        case 'signUpUsernameInput':

          const signUpUsername = this.state.signUpUsernameInput.value;

          this.checkUsername(signUpUsername, (inUse, message) => {
            if (inUse) {
              this.setState({
                [name]: {
                  value,
                  error: true,
                  label: {
                    value: message,
                    hidden: false,
                  },
                  icon: {
                    name: 'close',
                    color: 'red',
                  },
                  loading: false,
                  isValid: false,
                }
              });
            } else {
              
              this.validateUsername(signUpUsername, (isValid, message) => {
                if (isValid) {
                  this.setState({
                    [name]: {
                      value,
                      error: false,
                      label: {
                        value: '',
                        hidden: true,
                      },
                      icon: {
                        name: 'check',
                        color: 'green',
                      },
                      loading: false,
                      isValid: true,
                    }
                  });
                } else {
                  this.setState({
                    [name]: {
                      value,
                      error: true,
                      label: {
                        value: message,
                        hidden: false,
                      },
                      icon: {
                        name: 'close',
                        color: 'red',
                      },
                      loading: false,
                      isValid: false,
                    }
                  });
                }
              })


            }
          });
          break;
        case 'signUpPasswordInput':

          const signUpPassword = this.state.signUpPasswordInput.value;

          this.validatePassword(signUpPassword, (isValid, message) => {
            if (isValid) {
              this.setState({
                [name]: {
                  value,
                  error: false,
                  label: {
                    value: '',
                    hidden: true,
                  },
                  icon: {
                    name: 'check',
                    color: 'green',
                  },
                  loading: false,
                  isValid: true,
                }
              });
            } else {
              this.setState({
                [name]: {
                  value,
                  error: true,
                  label: {
                    value: message,
                    hidden: false,
                  },
                  icon: {
                    name: 'close',
                    color: 'red',
                  },
                  loading: false,
                  isValid: false,
                },
                registerButton: {
                  disabled: true,
                }
              })
            }
          });

          break;
        default:
          break;
      }


    }

  }

  handleChange = e => {

    const name = e.target.name;
    const value = e.target.value;
    const { error, icon, label, } = this.state[name];

    this.setState({
      [name]: {
        value,
        error: false,
        icon: {
          name: '',
          color: 'black',
        },
        label: {
          value: '',
          hidden: true,
        },
        loading: false,
      }
    });

    if (name === 'signInPasswordInput' && value !== '' && this.state.signInEmailInput.isValid) {
      this.setState({
        signInButton: {
          disabled: false,
        }
      })
    } else {
      this.setState({
        signInButton: {
          disabled: true,
        }
      })
    }

    if(name === 'signUpPasswordInput' && value !== '' && this.state.signUpUsernameInput.isValid && this.state.signUpEmailInput.isValid) {
      this.setState({
        registerButton: {
          disabled: false,
        }
      });
    } else {
      this.setState({
        registerButton: {
          disabled: true,
        }
      })
    }

  }

  handleSignUp = (e, info) => {

    switch(e.target.name) {
      case 'alertifiRegisterButton':

        const usernameIsValid = this.state.signUpUsernameInput.isValid;
        const emailIsValid = this.state.signUpEmailInput.isValid;
        const passwordIsValid = this.state.signUpPasswordInput.isValid;

        if ( usernameIsValid && emailIsValid && passwordIsValid) {


          axios.post(appUrl + '/api/users/signup', info)
          .then(res => {
            
            const { sent, message, } = res.data;

            alert(message);

            this.setState({
              signUpUsernameInput: {
                value: '',
                error: false,
                icon: {
                  name: '',
                  color: 'black',
                },
                label: {
                  value: '',
                  hidden: true,
                },
                loading: false,
                isValid: false,
              },
              signUpEmailInput: {
                value: '',
                error: false,
                icon: {
                  name: '',
                  color: 'black',
                },
                label: {
                  value: '',
                  hidden: true,
                },
                loading: false,
                isValid: false,
              },
              signUpPasswordInput: {
                value: '',
                error: false,
                icon: {
                  name: '',
                  color: 'black',
                },
                label: {
                  value: '',
                  hidden: true,
                },
                loading: false,
                isValid: false,
              },
              registerButton: {
                disabled: true,
              }
            });

          }).catch(err => {
            console.log(err);
          });
        }

        break;
      case 'googleSignInButton':

          window.location.href = `${ googleOAuthUrl }&redirect_uri=${ appUrl }/oauth/google/redirect`;

          break;
      case 'gitHubSignInButton':

        window.location.href = `${ gitHubOAuthUrl }&redirect_uri=${ appUrl }/oauth/github/redirect`;

        break;
     
      default:
        break;
    }

  }

  handleSubmit = e => {
    e.preventDefault();

    const { renderForm, } = this.props;

    if (renderForm === 'SignUp') {
       this.handleSignUp(e, {
        username: this.state.signUpUsernameInput.value,
        email: this.state.signUpEmailInput.value,
        password: this.state.signUpPasswordInput.value,
      });
    }

    if (renderForm === 'SignIn') {
      this.handleSignIn(e, {
        email: this.state.signInEmailInput.value,
        password: this.state.signInPasswordInput.value,
      });
    }

  }

  handleSignIn = (e, info) => {

    switch (e.target.name) {
      case 'alertifiSignInButton':

        const emailIsValid = this.state.signInEmailInput.isValid;
        const passwordIsValid = this.state.signInPasswordInput.isValid;

        if (emailIsValid && passwordIsValid) {
          axios.post(appUrl + '/api/users/signin', info)
             .then(res => {
               const authorization = {
                type: 'alertifi',
                token: res.data.token,
               };

               this.props.authenticate(authorization);
             }).catch(console.log);
        }
        
        break;
      case 'googleSignInButton':

        window.location.href = `${ googleOAuthUrl }&redirect_uri=${ appUrl }/oauth/google/redirect`;

        break;
      case 'gitHubSignInButton':

        window.location.href = `${ gitHubOAuthUrl }&redirect_uri=${ appUrl }/oauth/github/redirect`;
        
        break;
    }
  }

  componentDidUpdate() {

  }

  render() {

    const { renderForm } = this.state;

    const handlers = {
      handleError: this.handleError,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleBlur: this.handleBlur,
    }

    return (
      <>
        { renderForm === 'SignIn' && <SignInForm { ...this.state } { ...handlers } /> }
        { renderForm === 'SignUp' && <SignUpForm { ...this.state } { ...handlers } /> }
      </>
    );
  }
}

UserAccount.propTypes = {
  renderForm: PropTypes.string.isRequired,
}

export default UserAccount;
