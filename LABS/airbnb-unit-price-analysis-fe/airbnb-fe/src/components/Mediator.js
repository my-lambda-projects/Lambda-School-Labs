import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { getListings } from '../store/actions';
import { useAuth0 } from "../react-auth0-wrapper";
import styled from 'styled-components';

const Mediator = (props) => {
    const { user } = useAuth0();

    useEffect(() => {
        props.getListings(user.email);
        redirect()
    }, [props.listingsRetrieved, props.listings])

    const redirect = () => {
        if(props.listingsRetrieved) {
            if(props.listings.length === 0) {
                props.history.push('/search');
            } else {
                props.history.push('/dashboard');
            }
        }
    };
    
    return <StyledLoader type="TailSpin" color="grey" height={80} width={80} />
}

const StyledLoader = styled(Loader)`
    align-self: center;
    margin-top: 50vh;
`;

const mapStateToProps = (state) => {
    return {
        listings: state.listings,
        listingsRetrieved: state.listingsRetrieved
    }
}

export default connect(mapStateToProps, { getListings })(Mediator);