import React from 'react';

//SVG IMAGES FOR ROUTING
import { ReactComponent as RightArrow } from '../../../assets/img/lightIcons/arrow-forward (1).svg'
import { ReactComponent as LeftArrow } from '../../../assets/img/lightIcons/back (1).svg'
import { ReactComponent as UpArrow } from '../../../assets/img/lightIcons/arrow-up.svg'
import { ReactComponent as StartingPoint } from '../../../assets/img/lightIcons/location (1).svg'
import { ReactComponent as EndingPoint } from '../../../assets/img/lightIcons/marker (1).svg'
import { ReactComponent as NorthEast } from '../../../assets/img/lightIcons/diagonal-arrow-right-up (1).svg'



const Directions = (props) => {

    console.log('FROM DIRECTIONS', props)

    return (
        <>
            {props.props.map((string, index) => {

            let newStr = string.split(' ')

            for(let i = 0; i < string.length; i++){
                if(newStr[i] === 'right'){
                    return (
                        <div key={index} className='instructionsContainer'>
                            <RightArrow className='rightArrowIcon'/>
                            <p className="instruction">{string}</p>
                        </div>
                    )
                }
                if(newStr[i] === 'left' || newStr[i] === 'west'){
                    return (
                        <div key={index} className='instructionsContainer'>
                            <LeftArrow className='rightArrowIcon'/>
                            <p className="instruction">{string}</p>
                        </div>
                    )
                } 
                if(newStr[i] === 'forward'){
                    return (
                        <div key={index} className='instructionsContainer'>
                            <UpArrow className='rightArrowIcon'/>
                            <p className="instruction">{string}</p>
                        </div>
                    )
                } 
                if(newStr[i] === 'Start'){
                    return (
                        <div key={index} className='instructionsContainer'>
                            <StartingPoint className='rightArrowIcon'/>
                            <p className="instruction">{string}</p>
                        </div>
                    )
                }
                if(newStr[i] === 'NorthEast'){
                    return (
                        <div key={index} className='instructionsContainer'>
                            <NorthEast className='rightArrowIcon'/>
                            <p className="instruction">{string}</p>
                        </div>
                    )
                }
                if(newStr[i] === 'Finish'){
                    return (
                        <div key={index} className='instructionsContainer'>
                            <EndingPoint className='rightArrowIcon'/>
                            <p className="instruction">{string}</p>
                        </div>
                    )
                }
            }
            
            })}
        </>
    )
};

export default Directions;