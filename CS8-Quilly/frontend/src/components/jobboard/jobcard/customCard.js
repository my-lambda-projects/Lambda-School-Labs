import React from 'react';
import EditButton from './editButton';
import DeleteButton from './deleteButton';

const CustomCard = (props) => {
  return (
    <div style={{ id: props.id }}>
      <header
        style={{
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: props.cardColor
        }}>
        <div style={{ fontSize: 14, color: '#4C4C4C', fontWeight: 'bold', margin: 9 }}>{props.title}</div>
        <div style={{ fontSize: 16, fontWeight: 'bold' }}>{props.name}</div>
        <div style={{ fontSize: 11 }}>{props.dueOn}</div>
        <div className="buttonContainer" style={{ paddingTop: 3, paddingRight: 3 }}>
          <EditButton jobInfo={props.jobInfo} openEditModal={props.openEditModal}/>
          <DeleteButton jobId={props.jobInfo._id} openDeleteModal={props.openDeleteModal}/>
        </div>
      </header>
      <div style={{ fontSize: 14 }}>
        <div style={{ margin: 6, textAlign: 'center' }}>
          <p>{props.description}</p>
        </div>
        <div style={{ fontSize: 12, padding: 5, margin: 6, display: 'flex', justifyContent: 'flex-end' }}>
          <i>{props.label}</i>
        </div>
        <div style={{ marginTop: 10, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold' }}>
          {props.escalationText}
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
