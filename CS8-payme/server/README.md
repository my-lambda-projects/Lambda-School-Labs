# GiveMeMyMoney API

# Endpoints

## POST -- `/api/register` -- POST

Registers a new client.

| Property     | Type                                                      | Required |
| ------------ | --------------------------------------------------------- | -------- |
| username     | Email address                                             | Yes      |
| password     | String 6+ characters                                      | Yes      |
| fullName     | String                                                    | Yes      |
| companyName  | String                                                    | No       |
| phone        | String -- US Phone numbers only. 10 characters.           | Yes      |
| subscription | "perdiam" - $1.99 per invoice. "monthly" -- $20 per month | no       |

Success will return

```js
{
  token: 'JWT String',
  user: {
    stripe: {
      code: '',
      scope: '',
    },
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    fullName: 'John',
    companyName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
  },
};
```

Failure will return:

```js
{
  message: 'Reason for failure';
}
```

## GET -- `/api/login` -- GET

JWT must be sent as Authorization header fromatted as 'bearer {token}'. If JWT is valid, will return user same information as successful login or register post. If not valid, will return "Unauthorized".

## POST -- `/api/login` -- POST

| Property | Type   | Required |
| -------- | ------ | -------- |
| username | String | Yes      |
| password | String | Yes      |

Success will return:

```js
{
  token: 'JWT String',
  user: {
    stripe: {
      code: '',
      scope: '',
    },
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    fullName: 'John',
    companyName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
  },
};
```

Failure will return:

```js
{
  message: 'Reason for failure';
}
```

## POST -- `/api/changepassword` -- POST

Active JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

| Property        | Type   | Required |
| --------------- | ------ | -------- |
| newPassword     | String | Yes      |
| currentPassword | String | Yes      |

Success will return:

```js
{
  token: 'JWT String',
  user: {
    stripe: {
      code: '',
      scope: '',
    },
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    fullName: 'John',
    companyName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
  },
};
```

If `currentPassword` is incorrect, will return:
`{ message: "Not authorized." }`

## POST -- `/api/addinvoice/` -- POST

Active JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

| Property    | Type    | Required |
| ----------- | ------- | -------- |
| clientName  | String  | Yes      |
| companyName | String  | Yes      |
| isPaid      | Boolean | No       |
| number      | Number  | Yes      |
| pdf         | Array   | No       |
| totalAmount | String  | Yes      |
| phone       | Number  | No       |
| email       | String  | No       |

Success will return:

```js
{
    user: {
    stripe: {
      code: '',
      scope: '',
    },
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    fullName: 'John',
    companyName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
};
```

If the user dows not have an active subscription, or an active invoice credit, will return:
`{ message: 'No active subscription or invoice credits avaliable.', }`

If invoice number is already in use, will return:
`{ message: 'Invoice number already exists.' }`

If invoice failed to save, will return:
`{ message: "Failed to save invoice to database."}`

## GET -- `/api/invoices` -- GET

JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.
If JWT is active, will return:

```js
{
  invoices: [{ Invoice }, { Invoice }, { Invoice }];
}
```

## GET -- `/api/invoices/:number` -- GET

JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

`number` is the invoive number you would like returned.

If JWT is active, and `number` is a valid invoice number, will return just the requested invoice.

if JWT is active, and `number` is NOT a valid invoice number, will return:
`{ message: 'Invoice number does not exist.' }`

## GET -- `/api/clientinvoice/:invoiceID` -- GET

JWT is not required.

`invoiceID` is the \_id number of the invoice you want to view. This route is used so our client's client does not need to have an account or be logged in to view or pay an invoice that they were sent.

If `invoiceID` is valid, will return:

```js
{
    "clientName": String,
    "companyName": String,
    "isPaid": Boolean,
    "phone": {
        "number": Number,
        "frequency": String
    },
    "email": {
        "address": String,
        "frequency": String
    },
    "pdf": [],
    "_id": String,
    "number": String,
    "totalAmount": String,
    "__v": 0
}
```

if `invoiceID` is not valid, will return:
`{ message: 'Invoice not found.' }`

## POST -- `/api/charge' -- POST

This route is used for charging the customer for invoice credits or 30 day subscription fee.

JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

| Property | Type                                 | Required |
| -------- | ------------------------------------ | -------- |
| amount   | Number                               | Yes      |
| id       | `token.id` from `stripe.createToken` | YES      |

`amount` is the number of cents to charge the customer. i.e. $20.00 is `2000`, $1.99 is `199`. This value must be `2000` for a 30 day subscription or an exact multiple of `199` to add credits. If you send `2000`, it will add 30 days to the subscription. If you send any multiple of `199`, the server will calculate the number of credits to add. if you send a value that is NOT a multiple of `199`, or exactly `2000`, then you will receive a response of `{ message: 'Charge must be $20 or multiple of $1.99' }`. If successful, you will receive the entire user object as well as the succes message, as formatted below:

```js
{
  status: String,
  user: User // Same properties as every other time I return you a user object.
}
```

## POST -- `/api/payinvoice` -- POST

This route is for the client to pay an invoice that was sent to them from the admin.

JWT is not required.

| Property    | Type                                 | Required |
| ----------- | ------------------------------------ | -------- |
| amount      | Number                               | Yes      |
| description | String                               | Yes      |
| id          | `token.id` from `stripe.createToken` | YES      |

If successful, will return:

```js
{
  status: String,
  user: User // Same properties as every other time I return you a user object.
}
```

If failure, will return:

```js
{
  status: String;
}
```

## POST -- `/api/usi` -- POST

JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| stripe.code  | String | Yes      |
| stripe.scope | String | Yes      |

If both properties are not received, will return:
`{ message: 'Stripe info required.' }`

Success will return:

```js
{
    user: {
    stripe: {
      code: String,
      scope: String,
    },
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    fullName: 'John',
    companyName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
};
```
