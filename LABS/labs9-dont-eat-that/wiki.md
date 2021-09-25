#uploading changes to heroku

- `heroku run knex migrate:rollback -a donteatthat` 
- then `heroku run knex migrate:latest -a donteeatthat`


#changing db tables

- `knex migrate:rollback`
- `knex migrate:latest`


#local postgress server
https://github.com/Lambda-School-Labs/Labs8-OfflineReader/wiki/Setting-up-a-PostgreSQL-database-for-local-testing