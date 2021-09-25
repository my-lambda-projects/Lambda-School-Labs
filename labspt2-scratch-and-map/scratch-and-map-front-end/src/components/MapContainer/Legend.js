import React from 'react'
import { Message, List } from 'semantic-ui-react'

const Legend = () => (
    <Message className="legend">
        <List>
        <List.Item className="listItem">
        <List.Icon  className="notSelected" name='square' size="big" />
        <List.Content>Not Selected</List.Content>
        </List.Item>
        <List.Item className="listItem">
        <List.Icon className="lived" name='square' size="big" />
        <List.Content>Lived In</List.Content>
        </List.Item>
        <List.Item className="listItem">
        <List.Icon className="visited" name='square' size="big" />
        <List.Content>Visited</List.Content>
        </List.Item>
        <List.Item className="listItem">
        <List.Icon className="wantVisit" name='square' size="big" />
        <List.Content>Want To Visit</List.Content>
        </List.Item>
        <List.Item className="listItem">
        <List.Icon className="transited" name='square' size="big" />
        <List.Content>Transited</List.Content>
        </List.Item>
        </List>
    </Message>
)

export default Legend