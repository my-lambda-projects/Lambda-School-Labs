# RV Nav (iOS)

##  Contributors


|                                       [Ryan Murphy](https://tryanmurphy.com/)                                        |                                       [Jonathan Ferrer](https://www.jonathanferrer.dev)                                        |                                                                      
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | 
|                      [<img src="https://media.licdn.com/dms/image/C4D03AQGlHnkj67kkIQ/profile-displayphoto-shrink_200_200/0?e=1574294400&v=beta&t=l06yZViaeRx_F7TedurhJxqEBIz1bnmnd07t32JQbdw" width = "200" />](https://github.com/)                       |                      [<img src="https://media.licdn.com/dms/image/C5603AQFasjNpUIVxQA/profile-displayphoto-shrink_200_200/0?e=1572480000&v=beta&t=CWkr7Rz-506_6zvpcYV7_ciavR2nDw8Njf2kjnCwuNA" width = "200" />](https://github.com/)                       |                         |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MurphDirt879)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/JayFenam)             |                 |       |                |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/thomasryanmurphy/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ferrer-jonathan/) |



[![Platform](https://img.shields.io/cocoapods/p/LFAlertController.svg?style=flat)](http://cocoapods.org/pods/LFAlertController)
[![Swift Version 5.0][swift-image]][swift-url]
[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]


## Project Overview

You can find a webversion of the deployed project at [RVNav](www.RVNav.com).

[Trello Board](https://trello.com/b/uPEi1KSU/labs-15-rv-life)

[Product Canvas](https://www.notion.so/5aa76f6aca86492baaad94c9557ca2f3?v=a47d5b273e12448a816af139b3aa7ef0)

[UX Design files](https://www.figma.com/file/KGiH4omkur2KgDrckWclF9/🚍-RV-Life?node-id=0%3A1)



Traveling safely for RVers is difficult. RV Nav will get you to where you need to go safely and with no hassle.

Using several available data sources integrated into a map thats designed for RV travel, we supply you with the route you need. Trust RVNav to safely get you there.

![](header.png)

### Features

-    Register and Log in from the app.

-    Save and modify vehicle information.

-    Search for addresses.

-    Generate a route between two end points based on the given vehicle data and display it on a map view.

-    Location tracking.

## API's & SDK's

### ArcGIS RunTime SDK

[ArcGIS](https://developers.arcgis.com/ios/) is a mapping platform that allows for the calling and plotting of a user specified route. It also presents functionality to avoid specific hazards related to a vehicles height, weight, length and other relevant factors. 

### SideMenu

[SideMenu]( https://github.com/jonkykong/SideMenu) Simple side/slide menu control for iOS, no code necessary! Lots of customization.

### Mapbox Geocoder

[Mapbox Geocoder](https://github.com/mapbox/MapboxGeocoder.swift) is an iOS SDK that allows for the search for an addresses that is then turned into coordinates.


## Requirements

-   iOS 12
-   Xcode 10
-   Cocoa Pods

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.


### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).


## Documentation

See [Backend Documentation](https://github.com/labs15-rv-life/backend) for details on the backend of our project.


[swift-image]: https://img.shields.io/badge/swift-5.0-orange.svg
[swift-url]: https://swift.org/
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[codebeat-image]: https://codebeat.co/badges/c19b47ea-2f9d-45df-8458-b2d952fe9dad
[codebeat-url]: https://codebeat.co/projects/github-com-vsouza-awesomeios-com

## Know Issues:

- Timeout error on SDK route requests when barrier count is greater than 25.
- SideMenu SDK will cause black out of background. 

