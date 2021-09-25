## Folders/Files Structure

Naming Conventions:   
- folders (lowercase)
- Components (CamelCase)

#### backend
  - \_\_tests\_\_
  - config
    - middleware
      - errorHandler.js
  - db
    - migrations
      - #####\_create_name.js
    - models
      - users.js
      - categories.js
      - ect...
    - seeds
      - 001-users.js
      - ect...
    - dbConfig.js
  - assets
    - img
      - img1.jpeg
      - img2.jpeg
      - img3.jpeg
  - routes
    - usersRouter.js
    - categoriesRouter.js
    - ect...
  - index.js
  - server.js
  - package.json
  - knexfile.js
  - .gitigno.lock
  - README.md

#### frontend
  - design_files
  - public
  - src
    - components
      - Nav.js
      - Logindropdown.js
      - CategoryList.js
      - Buttons.js
      - Ect...
    - store
      - actions
        - actions1.js
        - actions2.js
        - actions3.js
        - ect...
        - index.js
      - reducers
        - reducers1.js
        - reducers2.js
        - reducers3.js
        - ect...
        - index.js
    - views
      - landing.js
      - register.js
      - login.js
      - ect...
    - \_\_tests\_\_
    - App.js
    - index.js
  - .gitignore
  - package-lock.json
  - package.json
  - README.md
- README.md
- LICENSE (MIT)

## Table Schema's

> Single Tables

### users

| Field        | Data Type                  |
| ------------ | -------------------------- |
| id           | Int (auto increment)       |
| username     | String (unique) (required) |
| password     | String (required)          |
| email        | String (optional) (unique) |
| status       | String (required)          |
| created_at   | bigInteger (required)      |

### categories

| Field        | Data Type                                                  |
| ------------ | ---------------------------------------------------------- |
| user_id      | foreign Key (id in users table)(user who created category) |
| id           | int (auto increment)                                       |
| name         | string (required)                                          |
| created_at   | bigInteger (required)                                      |

### discussions

| Field       | Data Type                          |
| ----------- | ---------------------------------- |
| id          | int (auto increment)               |
| user_id     | foreign key (id in users table)    |
| category_id | foreign key (id in category table) |
| title       | string(required)                   |
| created_at   | bigInteger (required)      |

### posts

| Field            | Data Type                            |
| ---------------- | ------------------------------------ |
| id               | int (auto increment)                 |
| user_id          | foreign key (id in users table)      |
| discussion_id    | foreign Key (id in discussion table) |
| body             | text (required)                      |
| created_at       | bigInteger (required)                |
| last_edited_at   | bigInteger (required)                |

### replies

| Field            | Data Type                            |
| ---------------- | ------------------------------------ |
| id               | int (auto increment)                 |
| user_id          | foreign key (id in users table)      |
| post_id          | foreign Key (id in post table)       |
| body             | text (required)                      |
| created_at       | bigInteger (required)                |
| last_edited_at   | bigInteger (required)                |

### user_settings

| Name            | Data Type (note, mods are individual roles assigned to a specific category)     |
| --------------- | ------------------------------------------------------------------------------- |
| user_id         | foreign Key (id in users table)                                                 |
| avatar          | Text (optional)(base64)                                                         |
| user_type       | String (required) (user,  silver_member, gold_member, and admin)                |
| signature       | string (255, optional)                                                          |
| subscribed_at   | bigInteger (required)                                                           |


> Relational Tables

### discussion_votes

- many user_id's can vote on many discussion_id's
- many discussion_id's can have many user_id's vote on it
- one vote per relationship/row between user_id and discussion_id

| Field         | Data Type                         |
| ------------- | --------------------------------- |
| discussion_id | int(foreign key)                  |
| user_id       | int(foreign key)                  |
| type          | bool(1 for upvote 0 for downvote) |

### post_votes

- many user_id's can vote on many post_id's
- many post_id's can have many user_id's vote on it
- one vote per relationship/row between user_id and post_id

| Field   | Data Type                             |
| ------- | ------------------------------------- |
| post_id | int(foreign key)                      |
| user_id | int(foreign key)                      |
| type    | integer(1 for upvote -1 for downvote) |

### reply_votes

- many user_id's can vote on many post_id's
- many reply_id's can have many user_id's vote on it
- one vote per relationship/row between user_id and reply_id

| Field    | Data Type                             |
| -------  | ------------------------------------- |
| reply_id | int(foreign key)                      |
| user_id  | int(foreign key)                      |
| type     | integer(1 for upvote -1 for downvote) |

### category_follows

- many user_id's can have/follow many categories_id's
- many categories_id's can have many user_id's/followers

| Field       | Data Type        |
| ----------- | ---------------- |
| category_id | int(foreign key) |
| user_id     | int(foreign key) |

### discussion_follows

- many user_id's can have/follow many discussion_id's
- many discussion_id's can have many user_id's/followers

| Field         | Data Type        |
| ------------- | ---------------- |
| discussion_id | int(foreign key) |
| user_id       | int(foreign key) |

### users_role_categories

- Many user_id's can have many category_id's
- Many category_id's can have many user_id's
- One role per relationship/row between category_id and user_id

| Field       | Data Type                            |
| ----------- | ------------------------------------ |
| role        | string (required) (super mod, mod)   |
| user_id     | foreign Key (id in users table)      |
| category_id | Foreign Key (id in categories table) |

### user_notifications


| Field         | Data Type                              |
| -----------   | ------------------------------------   |
| id            | int (auto increment)                   |
| user_id       | foreign key (id in users table)        |
| category_id   | foreign key (id in categories table)   |
| discussion_id | foreign key (id in discussions table)  |
| post_id       | foreign key (id in post table)         |
| reply_id      | foreign key (id in reply table)        |
| created_at    | bigInteger (required)                  |