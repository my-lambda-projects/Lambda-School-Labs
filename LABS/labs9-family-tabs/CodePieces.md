<!-- REDUCE DATA TO USERS BY EVENTS -->

let familyEventInfo = [
    {
        "family_name": "Jones",
        "userName": "Steve Jones",
        "scheduledEvent_name": "Game: Bears vs. Penguins",
        "timeDate": "March 22, 2019",
        "id": 1,
        "location_name": "baseball park",
        "address": "345 baseball avenue, Lexington, NJ, 55542",
        "eventType_name": "baseball"
    },
    {
        "family_name": "Jones",
        "userName": "Jenn Jones",
        "scheduledEvent_name": "Game: Bears vs. Penguins",
        "timeDate": "March 22, 2019",
        "id": 1,
        "location_name": "baseball park",
        "address": "345 baseball avenue, Lexington, NJ, 55542",
        "eventType_name": "baseball"
    },
    {
        "family_name": "Jones",
        "userName": "Barb Jones",
        "scheduledEvent_name": "Game: Tigers vs. Dingers",
        "timeDate": "February 25, 2019",
        "id": 3,
        "location_name": "baseball park",
        "address": "345 baseball avenue, Lexington, NJ, 55542",
        "eventType_name": "baseball"
    },
    {
        "family_name": "Jones",
        "userName": "Frank Jones",
        "scheduledEvent_name": "Game: Tigers vs. Dingers",
        "timeDate": "February 25, 2019",
        "id": 3,
        "location_name": "baseball park",
        "address": "345 baseball avenue, Lexington, NJ, 55542",
        "eventType_name": "baseball"
    },
        {
        "family_name": "Jones",
        "userName": "Kathy Jones",
        "scheduledEvent_name": "Game: Tigers vs. Dingers",
        "timeDate": "February 25, 2019",
        "id": 3,
        "location_name": "baseball park",
        "address": "345 baseball avenue, Lexington, NJ, 55542",
        "eventType_name": "baseball"
    },
    {
        "family_name": "Jones",
        "userName": "Mel Jones",
        "scheduledEvent_name": "Game: Tigers vs. Dingers",
        "timeDate": "February 25, 2019",
        "id": 3,
        "location_name": "baseball park",
        "address": "345 baseball avenue, Lexington, NJ, 55542",
        "eventType_name": "baseball"
    }
]

const eventsUserArray = (familyEventInfo) => {
  let usersByEvents = [{
    "userNames": [],
    "scheduledEvent_name": "",
    "timeDate": "",
    "id": null,
    "location_name": "",
    "address": "",
    "eventType_name": ""
    }],
    eventCheck = {}, 
    i = 0,
    j = 0; 

  const arrObjCreator = (familyEventInfo, usersByEvents, i, j) => {
    if(i === familyEventInfo.length) {
      return usersByEvents; 
    } else if(eventCheck[familyEventInfo[i].id] === undefined) {      
        usersByEvents[j] = {
          "userNames": [],
          "scheduledEvent_name": familyEventInfo[i].scheduledEvent_name,
          "timeDate": familyEventInfo[i].timeDate,
          "id": familyEventInfo[i].id,
          "location_name": familyEventInfo[i].location_name,
          "address": familyEventInfo[i].address,
          "eventType_name": familyEventInfo[i].eventType_name
          };

        eventCheck[familyEventInfo[i].id] = familyEventInfo[i].id;

        j++ 
        i++
      } else {
          i++
      }
    return arrObjCreator(familyEventInfo, usersByEvents, i, j);
  } 

  arrObjCreator(familyEventInfo,usersByEvents, i, j);

  i = 0, j = 0; 
  
  const userAdder = (familyEventInfo, usersByEvents, i, j, nameCounter=null) => {

    if(j === usersByEvents.length) {
      j = 0;
    } else if(i === familyEventInfo.length) {
        return usersByEvents; 
    } else if(familyEventInfo[i].id !== usersByEvents[j].id) {
        j++;
    } else if(familyEventInfo[i].id === usersByEvents[j].id) {
        usersByEvents[j].userNames.push(familyEventInfo[i].userName);
        
        i++;
        j++; 
    }
      userAdder(familyEventInfo, usersByEvents, i, j, nameCounter);
  }

  userAdder(familyEventInfo, usersByEvents, i, j);
  
  return usersByEvents;
}

eventsUserArray(familyEventInfo);