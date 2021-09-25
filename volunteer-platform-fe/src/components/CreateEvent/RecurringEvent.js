import React, { useState } from 'react';
import {
  Modal,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  InputNumber,
  Form,
} from 'antd';

import moment from 'moment';
import styled from 'styled-components';

const { Option } = Select;

export const RecurringEvent = props => {
  const { localState, setLocalState, error, setError } = props;
  const { dynamicDates, recurringInfo } = localState;

  const { dynamicNumber, dynamicNth, dynamicDay, dynamicYear } = dynamicDates;
  const [formState, setFormState] = useState({});

  const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const timePeriodOptions = ['Day', 'Week', 'Month'];

  const monthlyOptions = [
    `Monthly on day ${dynamicNumber}`,
    `Monthly on ${dynamicNth} ${dynamicDay}`,
  ];

  const repeatTimePeriodOptions = [
    'Weekdays',
    'Weekends (Fri, Sat, Sun)',
    'Sat/Sun Only',
    `Weekly on ${dynamicDay}`,
  ];

  if (dynamicNth !== 'Fifth') {
    repeatTimePeriodOptions.push(`Monthly on ${dynamicNth} ${dynamicDay} `);
  }

  repeatTimePeriodOptions.push(`Annually on ${dynamicYear}`);
  repeatTimePeriodOptions.push('Other');

  const closeModal = () => {
    setFormState({
      ...formState,
      recurringBoolean: false,
    });
  };

  const handleChange = (name, value) => {
    if (value === 'Other') {
      setFormState({
        ...formState,
        recurringBoolean: true,
      });
    }
    setLocalState({
      ...localState,
      recurringInfo: {
        ...recurringInfo,
        [name]: value,
      },
    });
  };

  const cancelModal = () => {
    setLocalState({
      ...localState,
      recurringInfo: {
        ...recurringInfo,
        repeatEvery: '',
        repeatEveryValue: '',
        days: '',
        monthlyPeriod: '',
      },
    });
    closeModal();
  };

  const isModalValid = () => {
    if (recurringInfo.repeatEvery > 0) {
      if (
        recurringInfo.repeatEveryValue === 'Day' ||
        recurringInfo.repeatEveryValue === 'Days'
      ) {
        return true;
      } else if (
        recurringInfo.repeatEveryValue === 'Week' ||
        (recurringInfo.repeatEveryValue === 'Weeks' &&
          recurringInfo.days.length > 0)
      ) {
        return true;
      } else if (
        recurringInfo.repeatEveryValue === 'Month' ||
        (recurringInfo.repeatEveryValue === 'Months' &&
          recurringInfo.monthlyPeriod)
      ) {
        return true;
      }
    }
  };

  const checkedRequired = () => {
    if (
      recurringInfo.repeatTimePeriod &&
      recurringInfo.occurrenceEndsAfter > 0
    ) {
      if (isModalValid()) {
        closeModal();
        setError('');
      } else {
        setError('This field is required.');
      }
    } else {
      setError('This field is required.');
    }
  };

  const periodOfTimeMap = timePeriodOptions.map(period => {
    if (localState.recurringInfo.repeatEvery > 1) {
      return (
        <Option key={period} value={period + 's'}>
          {period + 's'}
        </Option>
      );
    } else {
      return (
        <Option key={period} value={period}>
          {period}
        </Option>
      );
    }
  });

  const repeatTimePeriodMap = repeatTimePeriodOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  const monthlyPeriodMap = monthlyOptions.map(period => {
    return (
      <Option key={period} value={period}>
        {period}
      </Option>
    );
  });

  return (
    <StyledDiv>
      <Form>
        <Form.Item>
          <Radio.Group
            name={'recurringEvent'}
            onChange={e => handleChange(e.target.name, e.target.value)}
            disabled={!dynamicDay}
            defaultValue={recurringInfo.recurringEvent === 'Yes' ? 'Yes' : 'No'}
          >
            <Radio value={'Yes'}>Yes</Radio>
            <Radio value={'No'}>No</Radio>
          </Radio.Group>
        </Form.Item>

        {recurringInfo.recurringEvent === 'Yes' && (
          <span>
            <span>
              <Form.Item label={'Repeat Every'} required>
                <div className={'input'}>
                  <Select
                    name={'repeatTimePeriod'}
                    defaultValue={recurringInfo.repeatTimePeriod}
                    onChange={value => handleChange('repeatTimePeriod', value)}
                  >
                    {repeatTimePeriodMap}
                  </Select>
                </div>
                {error && !recurringInfo.repeatTimePeriod && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </Form.Item>
            </span>
            <div>
              <Form.Item label={'Event Ends'} required>
                <Radio.Group
                  name={'Occurrence Ends'}
                  defaultValue={recurringInfo.occurrenceEnds}
                  onChange={e => handleChange('occurrenceEnds', e.target.value)}
                  className={'radioWrapper'}
                >
                  <Radio value={'On'}>On</Radio>
                  <Radio value={'After'}>After</Radio>
                  <Radio value={'Never'}>Never</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            {recurringInfo.occurrenceEnds === 'On' && (
              <div className={'endDate'}>
                <Form.Item label={'End Date'} required>
                  <DatePicker
                    name={'occurrenceEndDate'}
                    format={'MM/DD/YYYY'}
                    onChange={value => handleChange('occurrenceEndDate', value)}
                    defaultValue={localState.date}
                    value={recurringInfo.occurrenceEndDate}
                    disabledDate={current =>
                      current && current < moment().endOf('day')
                    }
                  />
                  {error && !recurringInfo.occurrenceEndsAfter > 0 && (
                    <span className="error-message error-span left-aligned">
                      Must be higher than 0.
                    </span>
                  )}
                </Form.Item>
              </div>
            )}

            {recurringInfo.occurrenceEnds === 'After' && (
              <Form.Item label={'Number of Occurrences'} required>
                <InputNumber
                  name={'occurrenceEndsAfter'}
                  min={1}
                  defaultValue={recurringInfo.occurrenceEndsAfter}
                  onChange={value => handleChange('occurrenceEndsAfter', value)}
                />{' '}
                {localState.recurringInfo.occurrenceEndsAfter > 1
                  ? ' Occurrences'
                  : 'Occurrence'}
              </Form.Item>
            )}
          </span>
        )}
      </Form>

      <Modal
        title="Adding a Custom Repeat Time Period"
        width={720}
        closable
        onOk={() => checkedRequired()}
        onCancel={() => cancelModal()}
        onClose={closeModal}
        visible={formState.recurringBoolean}
      >
        <Form>
          <div>
            <div className={'errorFlex'}>
              <Form.Item label={'Repeat Every'}>
                <div>
                  <InputNumber
                    name={'repeatEvery'}
                    defaultValue={recurringInfo.repeatEvery}
                    onChange={value => handleChange('repeatEvery', value)}
                    min={0}
                  />
                </div>
                <div>
                  {error && !recurringInfo.repeatEvery && (
                    <span
                      className="error-message error-span left-aligned"
                      style={{ color: 'red', frontSize: '12px' }}
                    >
                      Must be higher than 0.
                    </span>
                  )}
                </div>
              </Form.Item>
            </div>
            <div>
              <Form.Item label={'Choose a time period'}>
                <Select
                  name={'repeatEveryValue'}
                  value={recurringInfo.repeatEveryValue}
                  onChange={value => handleChange('repeatEveryValue', value)}
                >
                  {periodOfTimeMap}
                </Select>
                {error && !recurringInfo.repeatEveryValue && (
                  <span
                    className="error-message error-span left-aligned"
                    style={{ color: 'red', frontSize: '12px' }}
                  >
                    {error}
                  </span>
                )}
              </Form.Item>
            </div>

            {recurringInfo.repeatEveryValue === 'Week' ||
            recurringInfo.repeatEveryValue === 'Weeks' ? (
              <Form.Item label={'On'}>
                <div className={'errorFlex'}>
                  <div>
                    <Checkbox.Group
                      name={'Days'}
                      defaultValue={recurringInfo.days}
                      options={dayOptions}
                      onChange={value => handleChange('days', value)}
                    />
                  </div>
                  <div>
                    {error && !recurringInfo.days.length > 0 && (
                      <span
                        className="error-message error-span left-aligned"
                        style={{ color: 'red', frontSize: '12px' }}
                      >
                        {error}
                      </span>
                    )}
                  </div>
                </div>
              </Form.Item>
            ) : null}

            {recurringInfo.repeatEveryValue === 'Month' ||
            recurringInfo.repeatEveryValue === 'Months' ? (
              <div>
                <Form.Item label={'Choose a monthly period'}>
                  <Select
                    name={'Monthly Period'}
                    defaultValue={recurringInfo.monthlyPeriod}
                    onChange={value => handleChange('monthlyPeriod', value)}
                  >
                    {monthlyPeriodMap}
                  </Select>
                  {error && !recurringInfo.monthlyPeriod && (
                    <span
                      className="error-message error-span left-aligned"
                      style={{ color: 'red', frontSize: '12px' }}
                    >
                      {error}
                    </span>
                  )}
                </Form.Item>
              </div>
            ) : null}
          </div>
        </Form>
      </Modal>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .errorFlex {
    display: flex;
    flex-direction: column;
  }
`;

export default RecurringEvent;
