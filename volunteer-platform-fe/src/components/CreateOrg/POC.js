import React from 'react';
import { Icon, Input, Form } from 'antd';
import { StyledLine, deleteModal } from '../../styled';

export const POC = ({ i, changePOC, setValues, values }) => {
  const formatPhone = (stored, input) => {
    const regExes = {
      '\\d?(\\d{3})(\\d{3})(\\d{4})$': '($1) $2-$3',
      '^(\\d)': '($1)',
      '\\((\\d{0,2})\\)(\\d)?$': '($1$2)',
      '(\\(\\d{0,3}\\))(\\d)$': '$1 $2',
      '(\\(\\d{0,3}\\)) (\\d{0,3})$': '$1 $2',
      '(\\(\\d{0,3}\\)) (\\d{3})(\\d)$': '$1 $2-$3',
      '(\\(\\d{0,3}\\)) (\\d{1,3}-)(\\d{0,4})$': '$1 $2$3',
      '(\\(\\d{3}\\))$': '$1',
      '(\\(\\d{0,3})$': '$1',
      '(\\(\\d{3})(\\d)$': '$1) $2',
    };
    for (let key in regExes) {
      let regex = new RegExp(key);
      if (regex.test(input)) {
        return input.replace(regex, regExes[key]);
      }
    }

    return stored;
  };

  const changeHandler = e => {
    e.preventDefault();
    if (/phone/.test(e.target.name)) {
      let formattedPhone = formatPhone(values[e.target.name], e.target.value);

      setValues({ ...values, [e.target.name]: formattedPhone });
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  const deletePOC = e => {
    e.preventDefault();
    const deletePOCModal = deleteModal({
      title: 'Are you sure you want to remove this point of contact?',
      content: 'This cannot be undone',
      onOk: () => changePOC('delete', i),
    });

    deletePOCModal();
  };

  return (
    <div className="fullPOCDiv">
      {i > 1 && <StyledLine />}
      {i > 1 && (
        <span className="trash-icon">
          <Icon
            type="delete"
            onClick={deletePOC}
            theme="twoTone"
            twoToneColor="#005a87"
          />
        </span>
      )}

      <div className="pocInfo">
        <Form.Item label={'Full Name'}>
          <Input
            name={`fullName${i}`}
            label={'Full Name'}
            onChange={e => changeHandler(e)}
            value={values[`fullName${i}`]}
            key={`fullName${i}`}
            placeholder={'Jane Done'}
          />
        </Form.Item>
        <Form.Item label={'Email'}>
          <Input
            name={`email${i}`}
            onChange={e => changeHandler(e)}
            value={values[`email${i}`]}
            key={`email${i}`}
            placeholder={'jane.doe@gmail.com'}
          />
        </Form.Item>
        <Form.Item label={'Phone'}>
          <Input
            name={`phone${i}`}
            onChange={e => changeHandler(e)}
            value={values[`phone${i}`]}
            key={`phone${i}`}
            placeholder={'(202) 213-1234'}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default POC;
