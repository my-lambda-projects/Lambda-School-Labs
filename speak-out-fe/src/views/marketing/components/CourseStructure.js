import React from 'react';

import sectionsABC from "../../../assets/course_structure_sectionsABC.png";
import sessions from "../../../assets/section_chart.png";
import headerPic from '../../../assets/placement-test-h.jpg';

function CourseStructure() {

    return (
        <>
            <h1>Schedules</h1>
            
            <section>
                <div className="place-test">
                    <div>
                        <h3>Placement Test</h3>
                        <p>We ask all students to take a written and verbal placement test.</p>
                    </div>
                    
                    <img className="test-pic" src={headerPic} alt='Person taking a test' />   
                    
                   
                </div>
            </section>

            <section>
                <h2 className="section-odd">Overall Course Structure</h2>
                <p>Where possible we will try to acommodate your needs when issuing schedules. However, this may not always be possible considering levels and other students who are already scheduled for the same group.</p>

                

                <section>
                    <h3>What does a level look like?</h3>
                    <p>Each level is 9 months long (one academic year).</p>
                    <img src={sectionsABC} className="level-flowchart" alt="Flowchart showing that sections A, B, and C are each 3 months long." />
                    <p>Each level is divided into 3 sections (A, B, and C) that are each 3 months long.</p>
                </section>

                <section>
                    <h3>What does a section look like?</h3>
                    <p>A section consists of 24 classes.</p>
                    <p>A student will receive a progress report at the end of every 8 classes (3 progress reports in total).</p>
                    <img src={sessions} className="section-flowchart" alt="Flowchart showing division of each section into 8 classes each, with progress reports after each one" />
                </section>

                <section>
                    <h3>What does a class look like?</h3>
                    <p>Each class is 90 minutes long.</p>
                    <p>The first class of each section will begin with a pretest to verify the skill level of the student.</p>
                    <p>All students will have a final exam.</p>
                </section>

            </section>                
        </>
    )
}

export default CourseStructure;