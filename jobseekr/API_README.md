#Jobseekr API

### Request > Route > Data > Response

API expects data of type `JSON`.


| Method > endpoint       | SEND           | RECEIVE  |
| ------------- |:-------------:| -----:|
| 'GET'  > '/jobs'           | `body: { username }`                        | `{jobs}`
| 'GET'  > '/meetups'           | `headers: { token }`                        | `{[...meetups]}`
| 'GET'  > '/contributions'           | `headers: { token }`                        | `{[...contributions]}`
| 'GET'  > '/resume' .       | `headers: { token }`  | `{title, url}` |
| 'GET'  > '/jobslist' .       | `headers: { token }`  | `{jobslist}` |
| 'PUT'  > '/changeemail'    | `body: { token, oldEmail, newEmail }`       | `{user}`
| 'PUT'  > '/changepassword' | `body: { token, oldPassword, newPassword }` | `{user}` 
| 'PUT'  > '/updatestatus'   | `body: { _id, status } `                    | `{success message}`
| 'DELETE' > '/jobs'         | `body: { _id }`                             | `{success message}`
| 'DELETE' > '/meetups'      | `body: { id }`                             | `{success message}`
| 'DELETE' > '/contributions'      | `body: { id }`                              | `{success message}`
| 'DELETE' > '/lists'        | `body: { id, lists, token }`               | `{success message}`
| 'POST' > '/signup'         | `body: { username, password }`             | `{newUser}`
| 'POST' > '/login'          | `body: { username, password }`              | `{token}`
| 'POST' > '/meetups'          | `body: { dateOfEvent, eventName, linkToEvent*, notes*, token }`| `{meetup}`
| 'POST' > '/contributions'          | `body: { dateOfContribution, contributionName, linkToContribution*, notes*, token }`| `{contribution}`
| 'POST' > '/resume'          | `data, headers: { token }`| `{title, url}`|
| 'POST' > '/jobslist'          | `body: { list, token, title }`| `{jobslist}`|
`* - optional`



### Models

### Routes
