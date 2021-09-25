import React from 'react';

class Services extends React.Component {
    render() {
        return (
            <section className="section pt-5" id="services">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h1 className="section-title text-center">Our Services</h1>
                            <div className="section-title-border margin-t-20"></div>
                            <p className="section-subtitle text-muted text-center padding-t-30 font-secondary">We give people the platform to create discussions and share ideas.</p>
                        </div>
                    </div>
                    <div className="row margin-t-30">
                        <div className="col-lg-4 margin-t-20">
                            <div className="services-box text-center hover-effect">
                                <i className="pe-7s-diamond text-custom"></i>
                                <h4 className="padding-t-15">Categories</h4>
                                <p className="padding-t-15 text-muted">Posts are separated into categories for easy filtering and navigation.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 margin-t-20">
                            <div className="services-box text-center hover-effect">
                                <i className="pe-7s-display2 text-custom"></i>
                                <h4 className="padding-t-15">Posts</h4>
                                <p className="padding-t-15 text-muted">Posts can be created in categories to discussion a certain topic or suggest new ideas.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 margin-t-20">
                            <div className="services-box text-center hover-effect">
                                <i className="pe-7s-piggy text-custom"></i>
                                <h4 className="padding-t-15">Comments and Replies</h4>
                                <p className="padding-t-15 text-muted">Comments and replies can be made on posts in which you want to participate.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row margin-t-30">
                        <div className="col-lg-4 margin-t-20">
                            <div className="services-box text-center hover-effect">
                                <i className="pe-7s-science text-custom"></i>
                                <h4 className="padding-t-15">Upvotes</h4>
                                <p className="padding-t-15 text-muted">Upvote posts and comments you want to have more visibility. Downvote posts and comments you feel do not contribute to the conversation.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 margin-t-20">
                            <div className="services-box text-center hover-effect">
                                <i className="pe-7s-news-paper text-custom"></i>
                                <h4 className="padding-t-15">Instant Notifications</h4>
                                <p className="padding-t-15 text-muted">Get notified instantly when something new is posted in a post or category you are following.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 margin-t-20">
                            <div className="services-box text-center hover-effect">
                                <i className="pe-7s-plane text-custom"></i>
                                <h4 className="padding-t-15">Search Entire Site</h4>
                                <p className="padding-t-15 text-muted">Search through all categories, posts, and comments to find what you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Services;