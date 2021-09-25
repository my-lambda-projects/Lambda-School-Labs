import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutAndContact from "./components/AboutAndContact";
import CourseStructure from "./components/CourseStructure";
import CoursesAndRegistration from "./components/CoursesAndRegistration";

import "./marketing.scss";

function Marketing({page}) {

    let componentToRender = Home;

    switch(page) {

        case "course_structure":
            componentToRender = CourseStructure;
            break;
        case "courses":
            componentToRender = CoursesAndRegistration;
            break;
        case "about":
            componentToRender = AboutAndContact;
            break;
    }

    return (
        <div>
            <Header />
            <div className="middle">
                {componentToRender()}
            </div>
            <Footer />
        </div>
    )
}

export default Marketing;