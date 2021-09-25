import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import { deleteModal } from '../../styled';

export const EditPOC = ({ i, setValues, values, removePOC }) => {
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
    let updatedPOC = [];
    if (/phone/.test(e.target.name)) {
      let formattedPhone = formatPhone(
        values.POC[i][e.target.name],
        e.target.value
      );
      updatedPOC = [...values.POC];
      updatedPOC[i][e.target.name] = formattedPhone;
      setValues({ ...values, POC: [...updatedPOC] });
    } else {
      updatedPOC = [...values.POC];
      updatedPOC[i][e.target.name] = e.target.value;
      setValues({ ...values, POC: [...updatedPOC] });
    }
  };

  const deletePOC = e => {
    e.preventDefault();
    const deletePOCModal = deleteModal({
      title: 'Are you sure you want to remove this point of contact?',
      content: 'This cannot be undone',
      onOk: () => removePOC(i),
    });

    deletePOCModal();
  };

  return (
    <div className="pocInfo">
      <span className="trash-icon">
        <Icon
          type="delete"
          onClick={deletePOC}
          theme="twoTone"
          twoToneColor="#005a87"
        />
      </span>
      <Input
        name={`fullName`}
        onChange={e => changeHandler(e)}
        value={values.POC[i].fullName}
        key={`fullName${i}`}
        placeholder={'Jane Done'}
      />
      <Input
        name={`email`}
        onChange={e => changeHandler(e)}
        value={values.POC[i].email}
        key={`email${i}`}
        placeholder={'jane.doe@gmail.com'}
      />
      <Input
        name={`phone`}
        onChange={e => changeHandler(e)}
        value={values.POC[i].phone}
        key={`phone${i}`}
        placeholder={'(202) 213-1234'}
      />
    </div>
  );
};

export default EditPOC;
