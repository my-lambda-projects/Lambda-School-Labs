import React, { Component } from 'react';
import CustomCard from './jobcard/customCard.js';
import formatDate from './formatDate.js';
import toggleBooleans from './toggleBooleans.js';
import axios from 'axios';
import config from '../../config/config';

// need to do `yarn add react-trello` to use the package.
import Board from 'react-trello';

import Jobcreatemodal from '../jobcreatemodal/jobcreatemodal';
import './jobboard.css';

class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.generateData = this.generateData.bind(this);
    this.handleListUpdates = this.handleListUpdates.bind(this);
  }

  generateData(jobsData) {
    const data = {};
    data.lanes = [];
    let cardIndex = 0;
    const listCards = {};

    // grab the names of the categories
    const listCategories = Object.keys(jobsData);

    // format list titles by capitalizing each first word
    const listTitles = listCategories
      .map(title => title.split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' '));

    // get job count of each list
    const listLabels = listCategories.map(list => jobsData[list].length.toString());

    // make job cards
    Object.entries(jobsData).forEach(([listName, listData]) => {
      listCards[listName] = [];

      // make sure there are some cards in the list before we start
      if (listData.length > 0) {
        listData.forEach((job) => {
          cardIndex += 1;
          listCards[listName].push({
            id: `Card${cardIndex}`,
            title: job.company,
            description: job.position,
            label: formatDate(job.createdAt),
            jobInfo: job
          });
        });
      }
    });

    // create lanes (aka columns)
    for (let i = 0; i < listCategories.length; i++) {
      data.lanes.push({
        id: listCategories[i],
        title: listTitles[i],
        label: listLabels[i],
        cards: listCards[listCategories[i]]
      });
    }

    return data;
  };

  handleListUpdates(cardId, sourceLaneId, targetLaneId, position, cardDetails) {

    const lists = this.props.jobs;
    const oldList = `${sourceLaneId}`;
    const newList = `${targetLaneId}`;

    if (targetLaneId !== sourceLaneId) {
      const applicationId = cardDetails.jobInfo._id;
      const oldJob = cardDetails.jobInfo;
      const newJob = Object.assign({}, oldJob, { category: `${targetLaneId}` }, toggleBooleans(newList));

      axios
        .put(`${config.serverUrl}/user/applications/update/${applicationId}`, newJob)
        .then((response) => {
          lists[oldList] = lists[oldList].filter(app => app !== oldJob);
          lists[newList].push(newJob);
          this.props.handleJobChange(lists);
        })
        .catch(error => error.console(error));
    }
  }

  render() {
    return (
      <div className="boardContainer">
        <Board
          data={this.generateData(this.props.jobs)}
          customCardLayout
          cardDragClass="draggingCard"
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleListUpdates}
          newCardTemplate={<Jobcreatemodal />}
          >
          <CustomCard 
            openEditModal={this.props.openEditModal} 
            openDeleteModal={this.props.openDeleteModal} 
          />
        </Board>
      </div>
    );
  }
}

export default JobBoard;
