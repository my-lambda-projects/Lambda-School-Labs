import axiosWithAuth from '../utils/axiosWithAuth';


//converts a given time (in google-acceptable format) from military time to 12-hour time
export const convertTime = (time)=>{
    // code converts response.data.starttime to number
    if (time){

        let splitStartTime = time.split(':');
        let joinStartTime = splitStartTime.join('');
        let startTimeAsNumber = parseInt(joinStartTime, 10);
    
        // fn for converting response.data.starttime and/or endtime back to time string (from number)
        function convertToTime(value, index) {
          return value.substring(0, index) + ":" + value.substring(index);
        }
    
        // converts times from 24 hour to 12 hour format
        if (startTimeAsNumber >= 1300) {
          startTimeAsNumber -= 1200;
          let startTimeAsString = startTimeAsNumber.toString();
          let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
          return convertedStartTime + 'pm';
        } else if (startTimeAsNumber >= 1200 && startTimeAsNumber < 1300) {
          let startTimeAsString = startTimeAsNumber.toString();
          let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
          return convertedStartTime + 'pm';
        } else {
          return time + 'am';
        }
    }
}

//adds an event template to the backend
export const addTemplate = async (data, { googleId, token }) => {
  const template = { ...data, googleId };
  console.log(template);
  try {
    const response = await axiosWithAuth(token).post(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template`,
      template
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

//updates an event template on the backend
export const updateTemplate = async (id, data, { googleId, token }) => {
  const template = { ...data, googleId };
  try {
    const response = await axiosWithAuth(token).put(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`,
      template
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};




//converts event to user's correct timezone
export const convertEvents = (selected, starttime, endtime, zone, title, notes) => {
  return selected.map(e => ({
    end: { dateTime: `${e}T${endtime}:00${zone}:00` },
    start: { dateTime: `${e}T${starttime}:00${zone}:00` },
    title: title,
    notes: notes
  }));
}

//deletes event template from the backend
export const deleteTemplate = async (id, {token}) => {
  try {
    const response = await axiosWithAuth(token).delete(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error); 
  }
};

//deletes event templates from backend, updates templateList state to reflect this. It also clears whatever dates were currently selected and turns of date selection mode, although these are probably irrelevant on mobile due to component restructure.
export const handleDelete = async (id, currentUser, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen) => {
  console.log('did i get this far?', id);
  await deleteTemplate(id, currentUser);
  const templates = templateList.filter(template => template.id !== id);
  setTemplateList(templates);
  clearSelected();
  setTemplateFormOpen(false);
};

