import React from 'react';
import { Link } from 'react-router-dom'
import "../../assets/css/general.css"

const Footer = () => (
    		<div className="f-area">
			<div className="page-holder">
				<div className="f-area-holder">
					<div className="box">
                        <h2>Tenantly</h2>
                                {/* <Link to={"/"}>
                        <img className="footer-logo" src={require("../../assets/images/logo.png")} alt="Logo" />
                     </Link> */}
						<ul>
                            <li><a href="#">About </a></li>
                            <li><a href="#">Pricing </a></li>
                            <li><a href="#">Careers </a></li>
						</ul>
					</div>
					<div className="box">
						<ul className="f-nav">
							<li><a href="#">For Tenants </a></li>
							<li><a href="#">For Landlords</a></li>
							<li><a href="#">For Partners</a></li>
						</ul>
						<ul className="social-nav s-hidden">
							<li><a target="_blank" href="#"><span class="fab fa-instagram"></span></a></li>
							<li><a target="_blank" href="#"><span class="fab fa-facebook-square"></span></a></li>
							<li><a target="_blank" href="#"><span class="fab fa-pinterest-square"></span></a></li>
						</ul>
					</div>
					<div className="box">
						<ul className="f-nav">
							<li><a href="#">Terms &amp; Conditions</a></li>
							<li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Say Hello</a></li>

						</ul>
					</div>
					<div className="box">
						<ul className="social-nav">
							<li><a target="_blank" href="#"><span class="fab fa-instagram"></span></a></li>
                            <li><a target="_blank" href="#"><span class="fab fa-facebook-square"></span></a></li>
						</ul>

					</div>
				</div>
			</div>
		</div>
)

export default Footer;