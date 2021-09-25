import React from 'react'

import PlacementTest from '../../../assets/placement-test.jpg';
import Terms from '../../../assets/terms.jpg';
import Fees from '../../../assets/kids-drawing.jpg';

// import "./CoursesAndRegistration.scss"


function CoursesAndRegistration() {
    return (
            <>
            <h1>Course Offerings </h1>
             <div className= "sections">
                <section className="class-levels">
                    <h2 className="section-odd">Kindergarten</h2>
                            <p>Movement, stories, activities, discussions, games and crafts, all centered around their topic of the day.</p>
                        <h3>General English</h3>
                            <p>Learn general English through stories, songs and crafts.</p>
                        <h3>Jolly Phonics</h3>
                        <p>Jolly Phonics is a world leader in children's literacy that will have them reading in no time.</p>
                </section>
                <section className="class-levels">
                    <h2 className="section-even">Primary</h2>
                            <p>Primary school children have a high abiliy to learn because of their social tendency, curiosity and natural enthusiasm. We teach this age group through crafts, role plays and games.</p>
                        <h3>General English</h3>
                            <p>Kids Box by Cambridge University Press will delight young learners through all the activities, crafts, role plays and simulations while alwas focused on the topic.</p>
                        <h3>Public School and Exam Support</h3>
                            <p>The Garden of Knowledge hand picked government school teachers that adore what they do and have a superior knowledge of their subjects. We offer support in English, Arabic, Math and Science.</p>
                </section>
                <section className="class-levels">
                <h2 className="section-odd">Intermediate and Secondary</h2> 
                            <p>For this age group we offer more real life scenarios, encouraging our students to go out in the real world and apply what they have learnt.</p>
                        <h3>General English</h3>
                            <p>Through various activities, such as role plays, simulations, research projects and public speaking the  students will develop a great independence and confidence in their language abilities.</p>
                        <h3>Public School and Exam Support</h3>
                            <p>The Garden of Knowledge hand picked government school teachers that adore what they do and have a superior knowledge of their subjects. We offer support in English, Arabic, maths, chemistry, biology and physics. We also offer 'night before the exam' revision classes.</p>
                </section>    
                </div>    
            <section>
                <h2 className="section-even">Registration Information</h2>

                <div className='registration-container'>

                    <section className="placement-test">
                        <img src={PlacementTest} />

                        <div>
                            <h2>Placement Test</h2>
                            <p>This can be taken online or at the center and will help us find the student's level when taking a language course.</p>
                        </div>
                    </section>

                    <section className="terms">
                        <div>
                            <h2>Terms and Conditions</h2>
                            <p>A parent will be required to sign a document containing course information and student behaviour guide, as well as commiting them to finish a 3 month section once they have started classes.</p>
                        </div>
                        <img src={Terms} />
                    </section>

                    <section className="fees">
                    <img src={Fees} />
                    <div>
                        <h2>Fees</h2>
                        <p>Kindergarten: 122BHD</p>
                        <p>Primary: 122BHD</p>
                        <p>Intermediate and Secondary: 127BHD</p>
                        <p>Cost includes registration, books, stationery, and 24 classes.</p>
                    </div>

                    </section>
                </div>
            </section>

            </>
    )
}

export default CoursesAndRegistration;

