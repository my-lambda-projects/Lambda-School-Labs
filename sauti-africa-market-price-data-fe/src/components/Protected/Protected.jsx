import React from 'react'
import { Message } from 'semantic-ui-react'
import logo from '../../assets/sauti-logo.png'

const Protected = () => (
  <div className="text-center hero my-5">
    <img
      className="mb-3 app-logo"
      src={logo}
      alt="Sauti Africa logo"
      width="120"
    />
    <h1 className="mb-4">Sauti Market Prices API</h1>
    <p>
      A public-facing API that allows you to access Sauti Africa's market price
      data
    </p>
    <Message error>
      <Message.Header size="huge">
        Please login to view the table
      </Message.Header>
    </Message>
  </div>
)

export default Protected
