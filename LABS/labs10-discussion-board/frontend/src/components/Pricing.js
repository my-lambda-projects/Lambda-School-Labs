import React from 'react';

class Pricing extends React.Component {
    render() {

        return (
            <section className="section pt-5" id="pricing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h1 className="section-title text-center">Our Pricing</h1>
                            <div className="section-title-border margin-t-20"></div>
                            <p className="section-subtitle font-secondary text-muted text-center padding-t-30">Choose from one of our amazing plans.</p>
                        </div>
                    </div>
                    <div className="row margin-t-50">
                        <div className="col-lg-4">
                            <div className="text-center pricing-box hover-effect">
                                <h4 className="text-uppercase">Free</h4>
                                <h1>$0.00</h1>
                                {/* <h6 className="text-uppercase text-muted"></h6> */}
                                <div className="pricing-border"></div>
                                <div className="plan-features margin-t-30">
                                    <p>Posts: <b className="text-custom">Unlimited</b></p>
                                    <p>Comments: <b className="text-custom">Unlimited</b></p>
                                    <p>Replies: <b className="text-custom">Unlimited</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">1</b> Profile</p>
                                    <p><b className="text-custom">No</b> Hidden Fees</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="text-center pricing-box bg-white hover-effect price-active">
                                <h4 className="text-uppercase">Silver</h4>
                                <h1>$9.99</h1>
                                <h6 className="text-uppercase text-muted">Billing Per Year</h6>
                                <div className="pricing-border"></div>
                                <div className="plan-features margin-t-30">
                                    <p>Posts: <b className="text-custom">Unlimited</b></p>
                                    <p>Comments: <b className="text-custom">Unlimited</b></p>
                                    <p>Replies: <b className="text-custom">Unlimited</b></p>
                                    <p>Categories: <b className="text-custom">Unlimited</b></p>
                                    <p>Signature: <b className="text-custom">YES</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">1</b> Profile</p>
                                    <p><b className="text-custom">No</b> Hidden Fees</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="text-center pricing-box hover-effect">
                                <h4 className="text-uppercase">Gold</h4>
                                <h1>$19.99</h1>
                                <h6 className="text-uppercase text-muted">Billing Per Year</h6>
                                <div className="pricing-border"></div>
                                <div className="plan-features margin-t-30">
                                    <p>Posts: <b className="text-custom">Unlimited</b></p>
                                    <p>Comments: <b className="text-custom">Unlimited</b></p>
                                    <p>Replies: <b className="text-custom">Unlimited</b></p>
                                    <p>Categories: <b className="text-custom">Unlimited</b></p>
                                    <p>Signature: <b className="text-custom">YES</b></p>
                                    <p>Avatar: <b className="text-custom">YES</b></p>
                                    <p><b className="text-custom">&nbsp;</b></p>
                                    <p><b className="text-custom">1</b> Profile</p>
                                    <p><b className="text-custom">No</b> Hidden Fees</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Pricing;
