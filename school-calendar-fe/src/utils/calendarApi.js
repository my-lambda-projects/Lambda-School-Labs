// TODO: make calendarId dynamic to allows user to choose which calendar to use
const calendarApi = gapi => ({
  // get all events from google calendar api
  listEvents: async () => {
    const data = await gapi.calendar.events.list({
      calendarId: 'primary', // controls which calendar to show
      timeMin: new Date().toISOString(), // controls the range of dates to show events from
      maxResults: 50, // controls the amount of events to show
      singleEvents: true,
      orderBy: 'startTime'
    });
    return data.result.items;
  },
  // get particular event
  getEvent: async (eventId) => {
    const event = await gapi.calendar.events.get({
      calendarId: 'primary',
      eventId
    })
    return event.result;
  },
  // add events to google calendar api
  addEvent: resource => {
    // renaming the fields to fit gapi format
    resource.summary = resource.title;
    resource.description = resource.notes;
    console.log('adding event', resource);
    // inserting created event to gapi
    const data = gapi.calendar.events.insert({
      calendarId: 'primary', // controls which calendar to show
      resource
    });
    return data.execute(resource => {
      console.log('from addEvent', resource);
    });
  },
  // edit event from google calendar api
  editEvent: (eventId, resource) => {
    resource.summary = resource.title;
    resource.description = resource.notes;
    const request = gapi.calendar.events.patch({
      calendarId: 'primary',
      eventId,
      resource
    });
    return request.execute(response => {
      console.log('from editEvent', response);
    });
  },

  // delete event from google calendar api
  deleteEvent: (eventId) => {
    const request = gapi.calendar.events.delete({
      calendarId: 'primary',
      eventId
    });
    return request.execute(response => {
      console.log('from deleteEvent', response)
    });
  }
});

export default calendarApi;
