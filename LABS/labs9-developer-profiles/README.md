# labs9-developer-profiles

**Frontend**
README: [Frontend README](frontend\README.md)
URL: https://ecstatic-dev-profiles.netlify.com/
Netlify Deploy: curl -X POST -d {} https://api.netlify.com/build_hooks/5c49e44ccfe233a8dc9de7e3

To start Frontend development server: 
    navigate to the front end folder in console `./frontend`
    set up appropriate .env file with API keys
    `yarn` (install dependencies)
    `yarn start`

**Backend** 
README: [Backend README](backend\README.md)
URL: https://developer-profiles.herokuapp.com/
Endpoints: https://labs9-dev-profiles.postman.co/collections/5974950-e056342f-7c99-46a3-a9af-f00c8f500ac8?workspace=9fb9d5d7-bdfb-4076-b7d7-2b7fdb9fd55d#b5126b23-9bc6-4989-bacb-ac1a4319dd89
Heroku command: heroku run knex --knexfile=./backend/knexfile.js migrate:rollback -a developer-profiles

To start Backend development server: 
    set up appropriate .env file with API keys in backend folder
    remain in root folder
    `yarn` (install dependencies)
    `nodemon` or `yarn dev`

Projects links: 
    Trello: https://trello.com/b/w0Su2ZIZ/labs9-developer-profiles
    Github: https://github.com/Lambda-School-Labs/labs9-developer-profiles
    TDD: https://docs.google.com/document/d/1WOugwUnzY34gdYBOIFUanbYZ8b--B16alxtAG_kl2e8/edit
    Wireframe: https://balsamiq.cloud/snv27r3/pwmgltp/rDB99
    Guidelines: https://docs.google.com/document/d/1KBLXucApsCGYJ2p1jIRjf7sgpsJKtFQhmnBK3LK3w6c/edit
    Rubric: https://docs.google.com/spreadsheets/d/1-D0SY8SkipneUox08vEdumf1OtGtX5gWTt7XQ1dBHCc/edit#gid=1885109639
    Whiteboard: https://docs.google.com/spreadsheets/d/1Bo74SDxab344hZ2kneM0_tt6b2LO5m4wa2dRkyHm-yw/edit#gid=753636956


Fake Acclaim Badge: https://www.youracclaim.com/badges/384d834b-33fa-40e4-9ffd-f6b426db730f