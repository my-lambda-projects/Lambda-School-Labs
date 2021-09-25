# Loanie

Loanie simplifies the mortgage process by breaking it down into phases. Each phase is concluded by completing its assignments. When the loan officer creates a loan an email is sent to the client inviting them to sign up. When a client signs up they instantly have access to their loan phases and assignments. As each phase is completed the client receives an optional text or email letting them know the loan officer has acknowledge the completion of each assignment.

---

## Setup

### Prerequisites

What you'll need:

* Twilio API key - A Twilio API key is required to automate text messages to clients. Sign up at https://twilio.com.

* Stripe API key - A Stripe API key is required to receive payments from subscribers. Setup an account at https://stripe.com.

* SendGrid API key - A Sendgrid API key is necessary to automate text messages to clients. Sign up at https://sendgrid.com.

### Installing

Clone the repository using the SSH or HTTPS method.

```bash
SSH: git clone git@github.com:Lambda-School-Labs/loanie.git
HTTPS: git clone https://github.com/Lambda-School-Labs/loanie.git
```

Navigate within the repository to the `loanie` directory and install the dependencies with 'npm install' or 'yarn install'.

Create an .env file in the `loanie` directory. Add the following information to your .env file:  
 SENDGRID_API_KEY=  
 SENDGRID_EMAIL_FROM=  
 TWILIO_ACCOUNT_SID=  
 TWILIO_AUTH_TOKEN=  
 TWILIO_PHONE_NUMBER=  
 MONGOLAB_MAROON_URI=

Install and launch an instance of MongoDB. Add the url of the MongoDB instance as the value associated with the MONGOLAB_MAROON_URI key in the .env file. Here is an example of a locally hosted instance of MongoDB. `MONGOLAB_MAROON_URI=http://localhost:27017`

Navigate to `loanie/loanie-view/src/Components/base.js` and adjust the value of base to the address of your server. Example: Local: `const base = http://localhost:3030';` Heroku: `const base = 'https://loanie.herokuapp.com';`

Executing the `npm start` or `yarn start` command in the loanie directory will start the front and back ends of the server. Loanie features a built-in proxy that forwards all browser requests to static html files.

---

## Tests

Run tests using `npm test` or `yarn test` in the loanie and loanie/loanie-view directories.

---

## Authors

The major contributors who brought this project to life:

* Joshua Hall - [MannieJay](https://github.com/MannieJay)
* Rashmi Baheti - [rbaheti](https://github.com/rbaheti)
* Samuel Kim - [IllSmithDa](https://github.com/IllSmithDa)

---

## License

MIT License

Copyright (c) 2018 Lambda Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
