import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import DateTimePicker from 'react-datetime-picker';
import InputMoment from 'input-moment';
import moment from 'moment';
import { getAllInvoices, getInvoice } from '../../actions/invoices';
import Sidebar from '../sidebar';
// import Dropdown from './dropdown';
import { addReminder, allReminders } from '../../actions/smsReminders';
import RemindForm from './reminderForm';

class Reminders extends Component {
  state = {
    reminder: {
      invoiceId: '',
      remind: 'weekly',
      message: '',
      rPhone: '',
      email: '',
      name: '',
      amount: null,
      isEmail: false,
      company: '',
      date: new Date(),
    },
    dropdown: true,
    Custmessage: false,
    calendar: false,
    selected: false,
  };

  componentDidMount() {
    this.props.getAllInvoices();
    this.props.allReminders();
  }

  onSelect = () => this.setState({ selected: !this.state.selected });

  onChange(date) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...date,
      },
    }));
  }

  handleInvoice(id, phone, name, amount) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...id,
        ...phone,
        ...name,
        ...amount,
      },
    }));
  }

  handleChange(e) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...e,
      },
    }));
  }

  toggle = msg => {
    console.log('hey');
    if (msg === 'cal') {
      this.setState({ dropdown: false, Custmessage: false, calendar: true });
    }
    // this.setState({ calendar: true });
    if (msg === 'sms') {
      this.setState({ Custmessage: true, calendar: false });
    }
  };

  render() {
    const { invoices } = this.props;
    const { reminder } = this.state;
    // const { invoice } = this.props;
    // console.log(reminder.name);
    console.log(reminder.date);
    console.log(reminder);
    return (
      <div className="reminder">
        <Sidebar />
        <div className="reminder-container">
          <div className="reminder-navigation">
            {reminder.name ? (
              <p style={{ marginRight: '5rem', marginLeft: '5rem' }}>
                CurrentInvoice:
                <span style={{ color: '#22CFB1' }}>{reminder.name}</span>
              </p>
            ) : null}
            {this.state.calendar || this.state.Custmessage ? (
              <div>
                <p>
                  Date Selected:
                  <span style={{ color: '#22CFB1' }}>{reminder.date.toString().slice(0, 25)}</span>
                </p>
              </div>
            ) : null}
          </div>
          {this.state.calendar ? (
            <div className="reminder-calendar">
              <div className="calendar_header">
                <p> Select desired date</p>
                <p onClick={() => this.toggle('sms')}>
                  <i
                    style={{ cursor: 'pointer' }}
                    className="fas fa-arrow-left remind fa-flip-horizontal"
                  />
                </p>
              </div>
              {/* <Calendar
                className="calendar"
                style={styles.calendarStyles}
                onChange={this.onChange}
                value={this.state.date}
              /> */}
              <DateTimePicker onChange={date => this.onChange({ date })} value={reminder.date} />
            </div>
          ) : null}
          <div className="reminder-form_container">
            <RemindForm
              handleMessage={e => this.handleChange({ message: e.target.value })}
              handleEmail={e => this.handleChange({ isEmail: e.target.value })}
              handleRemind={e => this.handleChange({ remind: e.target.value })}
              remind={reminder.remind}
              isEmail={reminder.isEmail}
              invoices={invoices}
              getInvoice={(id, phone, name, amount, email, company) => this.handleInvoice({
                invoiceId: id,
                rPhone: phone,
                name,
                amount,
                email,
                company,
              })
              }
              formData={reminder}
              history={this.props.history}
              selected={this.state.selected}
              onSelect={this.onSelect}
              togCalendar={this.toggle}
              dropdown={this.state.dropdown}
              cmessage={this.state.Custmessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  calendarStyles: {},
};

const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    invoice: state.invoice.currentInvoice,
    message: state.invoice.success,
    reminders: state.reminder.reminders,
  };
};

export default connect(
  mapStateToProps,
  {
    getAllInvoices,
    getInvoice,
    addReminder,
    allReminders,
  },
)(Reminders);
