<p align="center">
  <br><br>
<img src="./giveMe(4).png "/>
</p>

# **Description**

### Give Me My Money is a subscription based application that allows "Admins" to upload invoices, and set automatic email/sms messages to be sent to their "Client". The client can click the link in the email/sms and be directed to a page where they can easily and without barriers make the required payment to the admin.

## TechStack

- MongoDB
- Express
- React
- Node.js
- Redux
- Mongoose
- bcrypt
- jwt
- Twillio
- Stripe
- axios
- react router
- cron
- nodemailer

## App Walkthrough

- Create Admin account

- Connect Admin account to their stripe account (This is a requirement. In order for the Admin to receive a payment from their client, they must have a stripe account to receive the funds.)

- Admin can purchase a 30 day subscription or individual invoice credits. Admin will not be able to upload an invoice and set up reminders without one of these, and they can not purhase either of these without first connecting their payMe account with a stripe account.

- With active sub or avaliable credit, Admin can upload a PDF invoice, specify their client's contact info, and the total amount of the invoice.

- Admin can set up "reminders" that will send an email/sms to the client with a link for the client to pay the invoice. Email and SMS reminder are seperate, and can be sent with different frequencies. They are not required, so the Admin can choose Email, SMS, or both. (1 Invoice Credit will cover all the reminders of Emails and SMS messages)

- Clients can click on the link in the message and will be directed to a page where they can view the PDF invoice that the Admin has uploaded. Clients do not have to log in. If they have an issue with the amount or the content of the PDF, they can click the contact's name and send them an email directly. The client can also click the pay button to enter their credit card info and pay the invoice.

- Invoices paid by the client are automatically deposited into the admin's stripe account. A 5% fee is taken from the total invoice amount to cover stripe credit card fees.

# **Deployed Site**

### https://www.givememymoney.app/

## Backend Schemas

### User Schema

```
stripe: {
      code: {
        type: String,
        default: '',
      },
      scope: {
        type: String,
        default: '',
      },
    },
    // E-mail address is used as a username
    username: {
      type: Email,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    subscription: {
      type: Number,
      default: 0,
    },
    invoiceCredits: {
      type: Number,
      default: 0,
    },
    invoices: [{ type: ObjectId, ref: 'Invoice' }],
  },
  {
    timestamps: true,
  }
```

### Invoice Schema

```
clientName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    required: true,
  },
  img: { data: Buffer, contentType: String },
  totalAmount: {
    type: Number,
    required: true,
  },
  phone: {
    number: Number,
    frequency: {
      type: String,
      default: 'weekly',
    },
  },
  email: {
    address: Email,
    frequency: {
      type: String,
      default: 'weekly',
    },
  },
  admin: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  reminders: [{ type: ObjectId, ref: 'Reminder' }],
},
{
  timestamps: true,
}
```

## [Endpoints](/server/README.md)
