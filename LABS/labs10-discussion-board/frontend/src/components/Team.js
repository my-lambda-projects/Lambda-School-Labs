import React from 'react';

class Team extends React.Component {
  render() {
  	return (
     <section className="section pt-4" id="team">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="section-title text-center">Behind The People</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle text-muted text-center font-secondary padding-t-30">This project is brought to you by these talented individuals.</p>
                    </div>
                </div>
                <div className="row margin-t-50">
                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="https://avatars0.githubusercontent.com/u/43793595?s=460&v=4" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">James Page</h4>
                            <p className="text-uppercase team-designation">Developer</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="https://avatars0.githubusercontent.com/u/41485997?s=400&v=4" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Huthman King</h4>
                            <p className="text-uppercase team-designation">Developer</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="https://avatars2.githubusercontent.com/u/42251292?s=400&v=4" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">David Situ</h4>
                            <p className="text-uppercase team-designation">Developer</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="https://avatars0.githubusercontent.com/u/35614736?s=400&v=4" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Carlos Vargas</h4>
                            <p className="text-uppercase team-designation">Developer</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
  	);
  }
}
export default Team;