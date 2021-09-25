import React from 'react';
import moment from 'moment';

export const FilteredComponent = Component => {
  return (
    { events, filter, tagFilter, recurringEvents, organizations, activeTab },
    ...props
  ) => {
    const { interests, requirements, causeAreas } = tagFilter;
    const { location } = filter;
    const { state, city } = location;

    let filterCount = 0;
    for (let key in interests) interests[key] && filterCount++;
    for (let key in requirements) requirements[key] && filterCount++;
    for (let key in causeAreas) causeAreas[key] && filterCount++;

    let results = [];
    if (activeTab === 'Events') {
      events.forEach(event => {
        event.nextDate = event.startTimeStamp || event.date;
      });
      results = [...events];
      let newEvent = [];
      recurringEvents.forEach(event => {
        for (let date in event.registeredVolunteers) {
          if (moment().unix() - date < 0) {
            newEvent = { ...event, nextDate: date };
            results.push(newEvent);
          }
        }
      });

      results.sort((a, b) => a.nextDate - b.nextDate);
    } else {
      results = [...organizations].sort((a, b) =>
        a.organizationName > b.organizationName ? 1 : -1
      );
    }

    if (!results.length || !filterCount) {
      return (
        <Component
          results={results}
          type={activeTab}
          tags={tagFilter}
          {...props}
        />
      );
    }

    let filteredResults = results;
    filteredResults.forEach(result => (result.sortRank = 0));

    /* This is a crude way to sort events. For each filter match, sortRank
     * is incremented. At the end, we sort the results by sortRank. Any
     * events with a sortRank of zero are removed.
     *
     * I'm sure a more elegant, modularized solution is possible.
     */

    if (state) {
      filteredResults.forEach(result => {
        if (result.state.toLowerCase().includes(state.toLowerCase())) {
          result.sortRank = result.sortRank + 1;
        }
      });
    }
    if (city) {
      filteredResults.forEach(result => {
        if (result.city.toLowerCase().includes(city.toLowerCase())) {
          result.sortRank = result.sortRank + 1;
        }
      });
    }

    let testForTags = {
      causeAreas: {
        present: false,
        name: activeTab === 'Events' ? 'typesOfCauses' : 'causeAreas',
      },
      interests: { present: false, name: 'interest' },
      requirements: { present: false, name: 'volunteerRequirements' },
    };

    for (let key in testForTags) {
      for (let tag in tagFilter[key]) {
        if (tagFilter[key][tag]) {
          testForTags[key]['present'] = true;
          break;
        }
      }

      if (testForTags[key]['present']) {
        let name = testForTags[key]['name'];
        filteredResults.forEach(result => {
          result[name].forEach(tag => {
            if (tagFilter[key][tag]) {
              result.sortRank = result.sortRank + 1;
            }
          });
        });
      }
    }

    filteredResults.sort((a, b) => {
      if (a.sortRank === b.sortRank) {
        return a.nextDate - b.nextDate;
      } else return a.sortRank < b.sortRank ? 1 : -1;
    });
    filteredResults = filteredResults.filter(result => result.sortRank > 0);

    return (
      <Component
        results={filteredResults}
        type={activeTab}
        tags={tagFilter}
        {...props}
      />
    );
  };
};
