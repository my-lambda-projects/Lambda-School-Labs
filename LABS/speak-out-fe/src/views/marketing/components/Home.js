import React from 'react';
import { Link } from "react-router-dom";
import teacher from '../../../assets/native-english-speaker.jpg'
import learningFun from '../../../assets/learning-is-fun-small.jpg'
import family from '../../../assets/family-in-mind-small.jpg'
import { scrollToTop } from "../../../utils/helpers";

export default function Home() {

    return(
        <div className='home'>
            <div className='knowledge'>
                <h1>Knowledge For All</h1>
            </div>

            <div className="knowledge-buttons">
                <Link to='/register' onClick={scrollToTop}>Register Now</Link>
                <Link to='/courses' onClick={scrollToTop}>Learn More</Link>
            </div>

            <section className='why-special'>
                <h2>Why we're special</h2>

                <div className='special-container'>
                    <div className="learn-from-best">
                        <h3>Learn from the best</h3>             
                        <img src={teacher} alt="A native English speaking teacher"/>
                        <p>Qualified, passionate teachers, including native speakers for language courses.</p>
                    </div>

                    <div className="fun">
                        <h3>Learning is fun</h3>
                        <img src={learningFun} alt="A smiling girl holding a notebook"/>
                        <p>Students actively learn through role plays, hands-on activities, and age-appropriate games.</p>
                    </div>
                </div>
            </section>

            <section className="afford">
                <div className="afford-text">
                    <h2>Affordability</h2>
                    <p>Created with families in mind.</p>
                    <img src={family} alt="Picture of a father and two smiling sons"/>
                 </div>
            </section>

            
        </div>
    )
}