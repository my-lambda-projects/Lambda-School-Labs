import React from 'react';
import Instagram from '../../../assets/Instagram2.png';
import Facebook from '../../../assets/Facebook2.png';
import Twitter from '../../../assets/Twitter2.png';
import Tree from '../../../assets/Garden_tree_only.png';

function Footer() {
	return (
		<>
			<div className='footer'>
				<img src={Tree} className='tree' alt='Instagram link' />
				<hr className='footer-grass' />
				<footer>
					<div className='social-media-icons'>
						<a
							href='https://www.instagram.com/the_garden_of_knowledge/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<img src={Instagram} alt='Instagram link' />
						</a>
						<a
							href='https://www.facebook.com/thegardenofknowledgeedu'
							target='_blank'
							rel='noopener noreferrer'
						>
							<img src={Facebook} alt='Facebook link' />
						</a>
						<a
							href='https://twitter.com/thegardenedu'
							target='_blank'
							rel='noopener noreferrer'
						>
							<img src={Twitter} alt='Twitter link' />
						</a>
					</div>
				</footer>
			</div>
		</>
	);
}

export default Footer;
