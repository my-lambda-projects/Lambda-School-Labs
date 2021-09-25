# Allegiance iOS
You can find the deployed project on Test Flight if you have an invite.  See Joshua Kaunert or your section's Section Leader for help with connecting to Test Flight.  Test Flight operations are conducted from appstoreconnect.apple.com/login .  Log in to access Allegiance and gain the ability to manipulate testing invites as well as version control.

## 4️⃣ Contributors

|[John Pitts](https://github.com/johnpitts)                                        |                                                                               | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |


[![Swift Version 5][swift-image]][swift-url]
[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]
[![CocoaPods Compatible](https://img.shields.io/cocoapods/v/EZSwiftExtensions.svg)](https://img.shields.io/cocoapods/v/LFAlertController.svg)  
[![Platform](https://img.shields.io/cocoapods/p/LFAlertController.svg?style=flat)](http://cocoapods.org/pods/LFAlertController)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## Project Overview

1️⃣ [Trello Board](https://trello.com/b/2L0hcHSc/labs-15-allegiance)

1️⃣ [Product Canvas](https://www.notion.so/8e91d090efe3418e8e82e870c97c36b2?v=6d4840f710954cf29477aa255e8e3b89)

1️⃣ [UI/UX Figma Design files](https://www.figma.com/file/2IOo1GVvRaR7FkxpeU8xFq/🏀-Allegiance?node-id=0%3A12) 

Initially Allegiance should replace iMessage (group text) as the best way for folks with shared sports allegiances to converse about a single topic.  Groups are the foundation of Allegiance Sports App, as users will be able to find like-minded sports fans inside groups which match their fandom.  Not only can a user join a group, but can also create one.  Inside the group, users should be able to exchange posts/messages, similar to iMessage or even Twitter.  Groups will contain special items like Events.  Groups are an especially great way for remote fans to find each other.  Imagine Oakland Athletics fans living in Philadelphia-- there are so few of them they'd never find each other.  With Allegiance app they can not only find each other but begin to bond over their favorite sports topic online, while potentially building a tight community who could do more together offline as well.  What's special about Allegiance is the ability to create groups which reach OUTSIDE a person's normal local sphere of influence.  So instead of simply chatting about the Eagles with a few old pals over group-chat, the Allegiance fan can find fans who are even closer to their line of thinking.  Each Group will have a personality and culture of it's own, even when groups are following the same team!  Optimistic Phillies fans could be in a group; salty Phillies fans would have another group entirely.  After a sports society is formed, a kernel of usage, the app could take on a life of its own as user's gave feedback on their most desired features.  The important things are:






![](header.png)

### Features

-    User's can join or create Groups.
-    Groups are a focal point of communication amongst it's members.
-    Groups can be private or public groups, and have a moderator/creator.
-    Groups can also be generalized-- and these are called "Allegiances".   An example of an Allegiance would be the New Orleans Pelicans.  This NBA basketball allegiance could be shared by MANY fans of the team, but underneath the umbrella of the NO Pels Allegiance would be all the Groups which form to support the team.  In this respect, the Allegiance is the Father of many Groups.
-    Groups can have posts, events, and possibly other features of interest to fans of those groups.

### Authentication API here

Unfortunately, an early choice was made to use Auth0 for authentication.  Auth0 is a major headache, the support is pretty awful, and the instructions aren't super clear.  Auth0 has been offered help to improve their interface with iOS developers, but they didn't really take the bait and have changed nothing.  Good luck.  Recommendation would be to drop them rapidly.  Allegiance is a sports-chat app, basically, authentication of a super serious nature really isn't needed, and it will take iOS devs 5 to 10x more time to understand how it works and exploit it, than it would for those devs to simply write ("roll") their own.  There are 3 imporant pieces to Auth0 already in the app in this repository, and you'll find them in the code.
a). domain
b). clientID
c). seperate URLs which will be used, if you are getting a user's idToken or obtaining an accessToken to allow the app to make API calls to the back-end "securely".

Authentication was done with Auth0 mainly for Web Devs, as they have a bigger security issue bc each page in their app is a public url which could potentially be exploited.  iOS is a gated community, so realistically the iOS app could get by with a UUID-generated token using a common cloud back end you build yourself.  But since this is a combined effort, and the back-end and authentication are shared, Auth0 was chosen to allow a user to log in via either a browser OR iOS app.

The best instructions for iOS on Auth0 aren't on the site, but can be found by doing a search for the gitHub version of the instructions.  

### Payment API here

If you add payments, they should be micropayments, and the best micropayments service is Money Button using BitCoin S.V. (BSV)

### Back-end (https://documenter.getpostman.com/view/8269848/SVmpYhbT?version=latest#0a938091-098e-4d87-9d9c-7e93e18cb18f)
The back-end was built by the Web devs using Postman, a PostgreSQL structured database.  This was chosen due to the many inter-relationships of Groups with Users and Allegiances and Posts.  Should the need arise for local persistent storage of any kind, a Core Data local SQL-lite-like back-end has been written into the project.  At first it was used to allow development without a back-end when the Web Dev back-end wasn't complete.  This allowed development of iOS's app to continue with actual user-generated data.  The first integration with the back-end for iOS was the search for Groups done after the initiation sequences (see the Authentication Storyboard in the app) were finished.  This is the hardest network call as it involves search parameters and headers set up specifically in a POST format to get matching Groups to the user's search terms (an allegiance or favorite team, and zipcode).  The zipcode hasn't been fully implemented in this network call but the groupName search terms have been implemented and adding zipcode will be a simple addition from there.


## Requirements

-   Xcode 12 or 13
-   Cocoa Pods dependency manager for the Auth0 framework

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

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

See [Backend Documentation](_link to your backend readme here_) for details on the backend of our project.


[swift-image]: https://img.shields.io/badge/swift-3.0-orange.svg
[swift-url]: https://swift.org/
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[codebeat-image]: https://codebeat.co/badges/c19b47ea-2f9d-45df-8458-b2d952fe9dad
[codebeat-url]: https://codebeat.co/projects/github-com-vsouza-awesomeios-com
