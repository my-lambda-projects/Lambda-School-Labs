# 1️⃣ Best Places to Live -- Data Science Portion

You can find the complete project at [Live in the Best Place](liveinthebestplace.com).

The DS portion of this project found in this repo is a [Python Flask API](https://best-places-api.herokuapp.com/api)

## 5️⃣ Contributors

🚫Add contributor info below, make sure add images and edit the social links for each member. Add to or delete these place-holders as needed

|                                       [Justin Hsieh](https://github.com/)                                        |                                       [Michael Curry](https://github.com/mikedcurry)                                        |                                       [Student 3](https://github.com/)                                        |                                       [Student 4](https://github.com/)                                        |                                       [Student 5](https://github.com/)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://ca.slack-edge.com/T4JUEB3ME-UKVHZ9FHQ-5a50836a0db2-512" width = "200" />](https://github.com/justin-hsieh)                       |                      [<img src="https://avatars3.githubusercontent.com/u/45944625?s=460&v=4" width = "200" />](https://github.com/mikedcurry)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/justin-hsieh)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mikedcurry)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/justin-hsieh/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/michael-curry-7ab92118a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |



![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)

## Project Overview


1️⃣ [Trello Board](https://trello.com/b/Ff6i9yiF/best-places-to-live)

1️⃣ [Product Canvas](https://www.notion.so/Best-Places-to-Live-57d6b61b6248443484edaf4d8e0e9092)

The Best Places to Live website and app is a single resource to allow users to weigh all their factors of moving to a new city at once.
It creates comparisons between cities based on a user's factors to help user's decision. The goal is for it to be fun and engaging for the user while minimizing the amount of time spent researching cities. 

The Data Science portions of this project can be lumped into three stages:
1. A city sorting model based upon user input factors
2. Data Visualization for each city with compare-city functionality.
3. Bonus features -- cholopleth & heat maps; a tender-style swipe features for finding that perfect city match.

### Tech Stack

- Python
- Heroku 

### 2️⃣ Predictions

The model of our flask API takes in a JSON as a POST request in the format: 

```
Sample input:

{
"input1": ["population", "avg_commute_time"]
}
```

The input comes from users at the Front-End. They select any number of the displayed factors as important in deciding a new home city. The DS flask API then returns another JSON with 20 cities in format:

```
{
    "name": "New York City, NY",
    "photoMobile": <url>,
    "photoWeb": <url>,
    "population": 8175133.0,
    "geohash": 9whpt4gjbqfngtthkk9f
  },
```

These 20 cities are ranked in order of best fit based upon user selected factors. 

The city ranking function within our model works with pandas operations on a small csv found in the home directory of the flask API. The data-frame itself is composed of the following features: 133 possible city ranking factors; names of cities; location data; photo urls. Each row represents one of the top 256 largest cities in the United States. 

The numerical data for the 133 factors have been transformed using `df.rank()` on a scale of 0 to 1. This flattens the distribution (see below) of each numeric feature such that each factor when compared to others are on the same scale. Factors that are negatively coorilated to rank (e.g. commute time) have been reverse-ranked.

<img src="https://github.com/Lambda-School-Labs/best-places-to-live-ds/blob/master/data/flat_dist.png" width = "200" />

The `rankify()` function works by filtering the dataframe by user selected factors. After filtering, only the top quantile of all factors selected by the user remain. The overall score of each city is calculated by taking the mean of the user selected factor by row. Finally the overall scores are sorted in descending order, and the top 20 city matches are added to the JSON along with location, population, and a photo url as above.


### Data Sources

-   [Source 1] (https://raw.githubusercontent.com/labs15-best-places/backend/master/data-seeding/1-cities/data.js)
-   [Source 2] (http://developers.teleport.org/api/getting_started/#photos_ua)

### Python Notebooks

[Data Wrangling / Methodology]https://colab.research.google.com/drive/1FHGibP9lyn1ZSdwtL7arVHsR9QNFae2j)

<!-- [Python Notebook 2](🚫add link to python notebook here) -->

### 3️⃣ How to connect to the web API
The url for the API is: 
https://best-places-api.herokuapp.com/api


### 3️⃣ How to connect to the data API
<!-- 🚫 List directions on how to connect to the API here -->
Sumbit a POST request to:
[Python Flask API](https://best-places-api.herokuapp.com/api)

In the format:
```
{
"input1": ["population", "avg_commute_time", "<any number of valid factors>"]
}
```

API Returns JSON in the format:
```
{
    "name": "<city name>, <state>",
    "secure_url": <photo_url>,
    "population": <city population>,
    "geohash": <geohash number>
  },
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md.md). Please follow it in all your interactions with the project.

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

See [Front End Documentation](_link to your front end readme here_) for details on the front end of our project.
