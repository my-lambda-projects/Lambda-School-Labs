import React from 'react';


import landingImage from '../image/spices.png';

// const background = {
//     background-image: `url(${landingImage})`,
// };

class ImageContainer extends React.Component {
    render() {
        return (
            <div style={{ background:`url(${landingImage}) no-repeat fixed center`, backgroundSize: 'cover', height: '900px' }}>
            </div>
        );
    }
}
export default ImageContainer;