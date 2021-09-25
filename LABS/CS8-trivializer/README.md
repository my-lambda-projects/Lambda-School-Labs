Back end URL - https://fathomless-lowlands-45973.herokuapp.com

Front end URL - https://jolly-lewin-bc4120.netlify.com/

| API PATH               | METHOD        | 
| -----------------------|:-------------:|
| /signin                | POST          |
| /signup                | POST          |
|/api/user/update        | PUT           |
|/api/round/get          | GET           |
|/api/round/create-round | POST          |


**Current issues/notes:**
* Landing page is temporary
* When setting up a round, all fields must be entered for the request to the trivia api
* Logout is currently only on settings and billing pages
* Once account status is changed you must relog for changes to take effect.
* When changing any settings, you must at least include the old password
* Logo is not currently working
* PDF is not working on Games view
* PDF on Round view works on "Print" but not "Print blank"
* Nav bar is temporary and will be updated
* If trivia api does not have enough questions to satisfy the request parameters it will return no questions


**Game tiers:**
Free: 1 game, 3 rounds, 5 questions max per round
Basic: 10 games, 10 rounds, 10 questions max per round
Premium: Unlimited games and rounds; max 50 questions per round (api limitation)