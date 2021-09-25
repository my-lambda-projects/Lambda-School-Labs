#!/bin/bash
cd server
../node_modules/.bin/knex migrate:rollback
../node_modules/.bin/knex migrate:latest
../node_modules/.bin/knex seed:run
cd ..
