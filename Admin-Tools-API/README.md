# Admin Tools API

## Steps To contribute
* Clone the repository
* Create your branch `git checkout -b <name-of-participant>`
* Push your commits to your branch and when you're ready submit a Pull-Request
* Add two "reviewers" to the pull request. **All PR's must be examined by two other developers.

## [Local Environment Set up](docs/LOCAL_SETUP.md)
* Todo:
  * [] Make test repo for adding in a Webhook. Webhooks will have to point to your ngrok server for local development. 
* You'll need to make sure you have an Ngrok server up and running that points to your Node Server (localhost).
* When changes are deployed live, the webhooks that need to POST to our API will need to be updated to the Live URL.

## Conventions and Rules
* Todo:
  * [] Test Suites need to be in place for all of our endpoints
  * [] Set up Continuous Integration tests to run against every PR submitted.
  * ? do we need 100% test coverage?

## Issues and Bug tracking
* All issues need to be tracked in our GitHub issue tracker. 
* Notice a bug? Go ahead and report it in the issues and if you can begin to start a refactor submit a PR with your fix.
* Feature Request/Idea? Go ahead an open up an issue with the appropriate label. 

### This is how open sourced software is developed. Discussions about topics concerning technology choices or issues with the product need to be tracked in our Issue tracker here on Github.

### We need to discuss how our Workflow is organized.

### Extra curricular Todos: 
  * [] Documentation of all endpoints.
  * [] Linter Rules set in place.
  * [] Set up test suite.