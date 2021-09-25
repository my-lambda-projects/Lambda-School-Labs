# labspt2-workout-tracker

# Front-End Link:

http://workout-tracker-pt2.netlify.com/

# Back-End Link:

https://workout-tracker-pt2.herokuapp.com/


Welcome to Workout Track For Make Big Muscle!

# Steps to install App locally:

1.) Make sure to have a package handler installed.

    Yarn: https://yarnpkg.com/en/docs/getting-started

2.) From a terminal, run `git clone https://github.com/Lambda-School-Labs/labspt2-workout-tracker.git` in the directory of your chooseing.

3.) Next, run `cd labspt2-workout-tracker/front-end`

4.) Install the dependencies by running `yarn install`

5.) And now for the back-end, run `cd ../back-end` and run `yarn install`

6.) While in the back-end, create a .env file and populate it thusly. This will enable you to communicate with the local back-end server that we'll setup in the next section:

   `PORT = 3333
    DB = development
    DB_USER = me
    DB_PASS = password
    STRIPE_SECRET_KEY = sk_test_vUV2Q6vSUhL4aTpoYVNFHHCb00mmhjNqOl`

## The app will now run connected to our deployed server. To run this app on a local server, you'll first need to setup the database.

# Steps to get the Database up and running:

- Install PostgreSQL
    - Windows: https://www.postgresql.org/download/windows/

    - Mac: Use Homebrew.
        - Install Homebrew (if not already installed): https://brew.sh/
        - `brew install postgresql`
        - `brew services start postgresql` 

    - Linux/Ubuntu try this: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04 

- Optional: Install pgAdmin
   - https://www.pgadmin.org/download/  
    - Provides GUI for viewing database on your computer, similiar to SQLite DBrowser
    - Linux/Ubuntu try this: https://o7planning.org/en/11353/installing-pgadmin-on-ubuntu

- Use psql to Create User, Database

    - `psql` is the PostgreSQL interactive terminal. Running `psql` will connect you to a PostgreSQL host.   

    - Start by connecting to the default postgres database with the default login information: `psql postgres`

    - You’ll see that we’ve entered into a new connection. We’re now inside psql in the postgres database. 

    - Commands within psql start with a backslash `\`. To test our first command, we can ensure what database, user, and port we've connected to by using the `\conninfo` command.

    - Some useful psql commands:
        - `\q` | Exit psql connection
        - `\c` | Connect to a new database
        - `\dt` | List all tables
        - `\du` | List all roles
        - `\list` | List databases   

    - Next we'll **create a user**. We’ll create a role called `me` and give it a password of `password`. A role can function as a user or a group, so in this case, we'll be using it as a user.
        - `postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';`

    - We want me to be able to create a database. 
        -   `postgres=# ALTER ROLE me CREATEDB;`
        -   You can run `\du` to list all roles/users.

    - Now we want to create a database from the me user. Exit from the default session with `\q` for quit: `postgres=# \q`

    - We’re back in our computer’s default Terminal connection. Now we’ll connect postgres with me: `psql -d postgres -U me`
        - Instead of `postgres=#`, our prompt shows `postgres=>` now, meaning we're no longer logged in as a superuser.  

    - Next, we can **create a database** with the SQL command.
        - `postgres=> CREATE DATABASE testdb;`

    - Use the `\list` command to see the available databases.

    - Connect to the new `testdb` database with `me` using the `\c` (connect) command. Our prompt now displays that we’re connected to `testdb`.

- Run Knex Migrations 

    - Everything is setup in the repo already to migrate a users table and seed some sample users into our `testdb` database. 

    - Simply cd into the `back-end` folder of the repo and run the following commands:
        - `knex migrate:latest`
        - `knex seed:run`

    - We should now have a users table with some sample users in `testdb`! Check it out using psql and the command line or pgAdmin!

# From here, you'll need to change the path in the actions as well as Auth folder:

  In actions.js and Auth.js, you'll find instructions to change the path of the actions to the local database.




