import React from 'react';
import { Segment, Dropdown, Card, Icon, Image, } from 'semantic-ui-react';
import { style, } from './style/inline/inline.js';


const AlertFeedItem = props => {

    console.log(props);

    return (
        <Card
            link
            style={ style.alertFeedItem }
        >
            <Image 
                src={ props.images[0].large } 
                style={ style.alertFeedItemImage }
            />

            <Card.Content>
                <Card.Header>{ props.listingDetails.title }</Card.Header>
                <Card.Meta>{ props.listingDetails.location }</Card.Meta>
                
                <Card.Description style={ style.alertFeedItemDescription }>{ props.listingDetails.description }</Card.Description>
            </Card.Content>

            <Card.Content 
                extra
                style={ style.alertFeedItemExtra }
            >
                <p style={ style.alertFeedItemPrice }>{ props.listingDetails.price }</p>
                <p style={ style.alertFeedItemSellerType }>{ props.pageStats.sellerType }</p>
            </Card.Content>
        </Card>
    );
}


const AlertFeedSegment = props => {

    const selectOptions = props.user.alerts.map((alert, i) => {
        return {
            key: i,
            text: alert.title,
            value: i,
        };
    });

    const mapAlertItems = () => {
        
        if (props.user.alerts[0].title) {
            const items = props.user.alerts[props.alertFeedDropdown.value].items;

            return items.map((item, i) => {
                return (
                    <AlertFeedItem key={ i } { ...item } />
                );
            });
        }

    }

    // console.log(props.alertFeedDropdown.value);

    return (
        <Segment
            style={ style.alertFeedContainer }
        >

        <Dropdown
            id='alert-feed-dropdown'
            name='alertFeedDropdown'
            search
            selection 
            options={ selectOptions }
            placeholder='Alert Title'
            onChange={ props.handleAlertSelect }
            value={ props.alertFeedDropdown.value }
        />

        <Card.Group 
            style={ style.alertFeedItemsContainer }
        >
            { mapAlertItems() }
        </Card.Group>

        </Segment>
    );
}

export default AlertFeedSegment;