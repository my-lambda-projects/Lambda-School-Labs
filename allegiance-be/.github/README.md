# Allegiance API

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> An Express + Node.js API for Allegiance

## Table of Contents

- [Background](#Background)
- [Deploy](#Deploy)
- [Getting Started](#Getting-Started)
- [Database](#Database-and-Data-Model)
- [API](#api)
  - [Authentication](#Authentication)
  - [Resources](#Resources)
- [Maintainers](#maintainers)
- [License](#license)

## Background

People want to support their favorite teams, talk about sports, and interact with other fans yet conversations are siloed across different channels. It's difficult to find fans and build connections both in person and online. Standard social networks lack features built for the needs of sports fans. We aim to build an app that will allow sports fans to connect with each other through groups and local engagement with other fans that are located nearby.

## Deploy

This project is deployed using [Heroku](https://heroku.com). Please find Heroku documentation [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true).

## Getting Started

Before running the server locally, it is recommended that the user reads the documentation embedded within this readme about the [database](#Database-and-Data-Model) and the [api resources](#api).

- Clone this repository
- **npm install** to install all required dependencies (note PostgreSQL must be setup for all actions from this point on)
- **npx knex migrate:latest** to create tables in the development environment
- **npx knex seed:run** to populate the database with seed data
- **npm run server** to start the server locally

The technologies selected (Express, Knex, Node) were chosen for the vibrant documentation, large base of developer users, and established package ecosystems present for each of the techs.

## Database and Data Model

See link to diagram of the database model [here](https://dbdiagram.io/d/5d54606dced98361d6dd9a8e). This project uses [PostgreSQL](https://www.postgresql.org/) in both development and production environments. Find documentation for PostgreSQL [here](https://www.postgresql.org/docs/). Note that the user will need to setup environment variables as required by Knex and PostgreSQL.

Sample variables:  
DB_LOCAL=allegiance  
DB_LOCAL_USER=postgres  
DB_LOCAL_PASSWORD=password

DB_TEST=test  
DB_TEST_USER=postgres  
DB_TEST_PASSWORD=password

## API

### Authentication

Allegiance uses [Auth0](https://auth0.com/) for its authentication and API call processes. Please find Auth0 documentation [here](https://auth0.com/docs), along with the step by step tutorial used in this project [here](https://auth0.com/docs/quickstart/spa/react).

### Resources

All endpoints have been documented using [Postman](https://www.getpostman.com/). The latest version can be found [here](https://documenter.getpostman.com/view/8269848/SVmpYhbT?version=latest).

---

## Maintainers

### Labs 17
| ![Luis Martinez](https://github.com/luiscmartinez.png) | ![Sean Doyle](https://github.com/sdoylelambda.png) | ![Connor Claxton](https://github.com/czclaxton.png) | ![Zachary Lasky](https://github.com/ZacharyLasky.png) | ![Brandon Gasing Dong](https://github.com/gasingdong.png)  |
| --------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| [@luiscmartinez](https://github.com/luiscmartinez) | [@sdoylelambda](https://github.com/sdoylelambda) | [@czclaxton](https://github.com/czclaxton) | [@ZacharyLasky](https://github.com/ZacharyLasky)   | [@gasingdong](https://github.com/gasingdong) |

### Labs 15
| ![Jarred Stanford](https://github.com/JarredStanford.png) | ![Derek Schwantner](https://github.com/DerekSchwantner.png) | ![Adam McKenney](https://github.com/DaftBeowulf.png) | ![Ang Xu](https://github.com/AngXuDev.png) | ![Dan O'Neill](https://github.com/danpatrickoneill.png)  |
| --------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| [@JarredStanford](https://github.com/JarredStanford)      | [@DerekSchwantner](https://github.com/DerekSchwantner)      | [@DaftBeowulf](https://github.com/DaftBeowulf)       | [@AngXuDev](https://github.com/AngXuDev)   | [@danpatrickoneill](https://github.com/danpatrickoneill) |

## License

MIT © 2019 Allegiance
