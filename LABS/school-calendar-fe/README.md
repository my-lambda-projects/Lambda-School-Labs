## Code Climate
[![Maintainability](https://api.codeclimate.com/v1/badges/3d26f594475564dc6550/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/school-calendar-fe/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/3d26f594475564dc6550/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/school-calendar-fe/test_coverage)

# School Calendar
You can find the project live at [D8Picker](https://www.d8picker.com/)


## :one:  Developers and Designers
### Team Lead
Vladislav Mogilevskiy |
:-: |
<img width="150" src="https://ca.slack-edge.com/ESZCHB482-W012X6RQ5G9-833633f70058-512" />|  
[Github](https://github.com/vladmog) |
[LinkedIn](https://www.linkedin.com/in/vladmog/) |

### UX Designer
Dariush Khansari |
:-: |
<img width="150" src="https://ca.slack-edge.com/ESZCHB482-W0123RQ0631-012e227f2a76-512" />| 
[The Sunday Lab](http://thesundaylab.com/)
[LinkedIn](https://www.linkedin.com/in/dariush-khansari-8b8a068/)

### Fullstack Engineers
Aldair Balanzar | Nagasar "Dan" Hamraj | Katya Pavlopoulos | Vanshika Pundir | Devanee Reid
:-: | :-: | :-: | :-: | :-: |
<img width="150" src="https://ca.slack-edge.com/ESZCHB482-W0123RSADV5-029b65971ee0-512" />| <img width="150" src="https://ca.slack-edge.com/ESZCHB482-W012QNSNQMA-e9b8122a3e86-512" /> | <img width="150" src="https://ca.slack-edge.com/ESZCHB482-W012JHWK0UA-2fad76ae07b1-512" /> | <img width="150" src="https://ca.slack-edge.com/ESZCHB482-W012X6Y74SD-a18656d79276-512" /> | <img width="150" src="https://ca.slack-edge.com/ESZCHB482-W0123RNG7CP-c4270c21af39-512" />
[Github](https://github.com/aldairbalanzar) | [Github](https://github.com/danhamraj7) |[Github](https://github.com/kp1129) |[Github](https://github.com/VanshikaP) | [Github](http://github.com/devaneereid)
[LinkedIn](https://www.linkedin.com/in/aldair-balanzar-390185177/)| [LinkedIn](https://www.linkedin.com/in/nagasar-hamraj-90ab2b193/) |[LinkedIn](https://www.linkedin.com/in/katyapavlopoulos/) | [LinkedIn](https://www.linkedin.com/in/vanshikapundir/) | [LinkedIn](https://www.linkedin.com/in/devanee-reid/) |





## :three: Project Overview

:memo: [Trello Board](https://trello.com/b/FrBXcG1x/labs-24-d8picker)

:memo: [Product Canvas](https://www.notion.so/School-Calendar-4f6d59c69ed5456c9b78174ac6292e00)

School Calendar was an app idea brought to Lambda from a high school basketball coach. 
The coach would like a calendar that would make it easy for him to schedule events that have an irregular schedule. 
Currently on Google Calendar, you can set an event to repeat daily, weekly, monthly, etc, 
but to create an event that repeats, for example, 3 times a week and has a different start/end time depending 
on the day of the week, the user has to create each event manually. As a result, it takes the coach a long time 
to schedule practice sessions for his teams each time a new season starts.

Along with increased efficiency in creating events that have an irregular schedule, the coach would like
an easy way to notify the teams of upcoming practice sessions, games, workout sessions, as well as 
any changes made to previously-scheduled events.


## 4️⃣ Key Features

-    User authentication with Google Sign In
-    Create, Edit, and Delete events (templates that can be reused across multiple days)
-    Create, Edit, and Delete event dates (actual events created from event templates that show up on the calendar view)
-    Display upcoming event dates
-    Sync event dates to admin's Google Calendar
-    Toaster notifications (user feedback in admin flow)
-    Easily create new event dates from past event templates
-    Create, Edit, and Delete groups (teams)
-    Add contacts (the admin can add a contact and their info)
-    Add contacts via an invite link (the contacts themselves can fill out their info)
-    Assign and remove contacts from groups
-    Assign an entire group to an event

### Coming soon

-    Send SMS notifications to contacts about relevant events (work in progress)
-    Day, Week, Season, and Year calendar views (future release)
-    Add attachments to events (future release)


## :five: Tech Stack

### Front End built using:

#### React

-    Provides good code bases for things like calendars.
-    Group knowledge of it.
-    Hooks makes things more simple.
-    Context API provides state-management and seemlessly intergrates with browser's local storage

#### Styled-Components

-   Easy to implement custom UX design

#### Chakra-UI

-   Legacy
-   Used to build and render the calendar itself

#### Component composition

<img src="https://i.imgur.com/GTpd3qX.png" />

#### Front end deployed to `Netlify`

-   Continuous integration makes deploying new features and bug fixes easy

### Back End build using:

#### Node.JS

-   Provides an easy way to implement code following MVC model
-   Knex JS allows simple and flexible query-building
-   API routes are implemented using Express

#### PostgreSQL

-   Powerful and reliable
-   Production database

#### SQLite

-   Light, portable, easy to set up and get started
-   Development database
-   Testing database
  
#### Back end deployed to `Heroku`

-   Continuous integration makes deploying new features and bug fixes easy
  

## :six: Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. 
These variables are stored securely on Heroku.

REACT_APP_GOOGLE_CLIENT_ID  
REACT_APP_GOOGLE_API_KEY  
REACT_APP_BASE_URL  
REACT_APP_ENDPOINT_URL  

## :seven: Open Questions ❓

-   Can the application push existing calendars and/or events to a user's Apple Calendar or other calendars?
-   Imagine a calendar is full of events, how to can a user search for a particular event? 
Should the search algorithm be built from scratch or using existing third-party service such as Algolia?

## :eight: Installation Instructions

With this project Yarn was used for the frontend and NPM was used for the backend. 

### Project dependencies: 
```
  "@chakra-ui/core": "^0.5.2",  
  "@emotion/core": "^10.0.27",  
  "@emotion/styled": "^10.0.27",  
  "@fortawesome/fontawesome-svg-core": "^1.2.28",  
  "@fortawesome/free-solid-svg-icons": "^5.13.0",  
  "@fortawesome/react-fontawesome": "^0.1.10",  
  "axios": "^0.19.2",  
  "dayjs": "^1.8.20",  
  "dot-env": "0.0.1",  
  "dotenv": "^8.2.0",  
  "emotion-theming": "^10.0.27",  
  "googleapis": "47.0.0",  
  "history": "^4.10.1",  
  "node-sass": "^4.13.1",  
  "react": "^16.12.0",  
  "react-dom": "^16.12.0",  
  "react-ga": "^2.7.0",  
  "react-hook-form": "^4.10.1",  
  "react-router-dom": "^5.1.2",  
  "react-scripts": "3.4.0",  
  "react-toast-notifications": "^2.4.0",  
  "react-virtualized-auto-sizer": "^1.0.2",  
  "react-window": "^1.8.5",  
  "react-window-infinite-loader": "^1.0.5",  
  "styled-components": "^5.0.1"  
```
### Dev Dependencies:
```
  "@testing-library/jest-dom": "^4.2.4",  
  "@testing-library/react": "^9.4.0",  
  "@testing-library/react-hooks": "^3.2.1",  
  "@testing-library/user-event": "^7.1.2",  
  "enzyme": "^3.11.0",  
  "enzyme-adapter-react-16": "^1.15.2",  
  "enzyme-to-json": "^3.4.4",  
  "mutationobserver-shim": "^0.3.5",  
  "prettier": "^1.19.1",  
  "react-test-renderer": "^16.12.0"  
```

## Other Scripts
```
  "start": "react-scripts start",  
  "build": "react-scripts build",  
  "test": "react-scripts test",  
  "eject": "react-scripts eject",  
  "coverage": "npm run test -- --coverage || true"  
```
    
## :one: :zero: Contributing

When contributing to this repository, please first discuss the change you wish to make 
via issue, email, or any other method with the owners of this repository.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## :one: :one: Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

## :one: :two: Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

## :one: :three: Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

## :one: :four: Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## :one: :five: Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## :one: :six: Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/school-calendar-be) for details on the backend of our project.
