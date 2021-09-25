import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    .register-now {
        margin-top: -100px;
    }
`;

class Process extends React.Component {
    render() {
        const { toggleRegisterModal } = this.props;
        return (
            <Wrapper>
                <section className="section bg-light">
                    <div className="text-center mx-auto register-now">
                        <Link to="" onClick = { toggleRegisterModal } className="btn btn-custom waves-light waves-effect margin-t-50">Register Now for Free! <i className="mdi mdi-arrow-right"></i></Link>
                    </div>
                </section>
            </Wrapper>
        );
    }
};

export default Process;
