import React, { Component } from 'react';
import axios from 'axios';
import UserCardContainer from './UserCard.styles.js'

class UserCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr: [],
            expanded: false,
            projects: [],
            education: [],
            experience: [],
            top_skills: [],
            add_skills: [],
            familiar: [],
        }
    }

    componentDidMount(){
        this.getUserExtras('projects')
        this.getUserExtras('education')
        this.getUserExtras('experience')
        this.getUserSkills('top_skills')
        this.getUserSkills('add_skills')
        this.getUserSkills('familiar')
    }

    getUserExtras = (extra) => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.id}/${extra}`).then(response => {
            this.setState({[extra]: response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    getUserSkills = (skilltype) => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.id}/skills/${skilltype}`).then(response => {
            this.setState({[skilltype]: response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    deleteUserSkill = (skilltype, skillID) => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.id}/deleteskill/${skilltype}/${skillID}`).then(response => {
            this.props.updateProgress()
        }).catch(err => {
            console.log(err)
        })
    }

    del(type, thingToBeDeleted ){
        if(this.props.canEdit){
            this.props.delExtra(thingToBeDeleted.user_id, type, thingToBeDeleted.id)
        }
    }

    edit(thingToBeEdited ){
        if(this.props.canEdit){
            this.props.editExtra(thingToBeEdited)
        }
    }

    render(){
        // console.log(this.props)
        let topSkillsArr;
        let addSkillsArr;
        let famSkillsArr;
        let userEducationArr;
        let userExperienceArr;
        let userProjectsArr;

        if (this.props.userTopSkills) {
            topSkillsArr = this.props.userTopSkills
        } else {
            topSkillsArr = this.state.top_skills
        }
        if (this.props.userAddSkills) {
            addSkillsArr = this.props.userAddSkills
        } else {
            addSkillsArr = this.state.add_skills
        }
        if (this.props.userFamSkills) {
            famSkillsArr = this.props.userFamSkills
        } else {
            famSkillsArr = this.state.familiar
        }
        if (this.props.userProjects) {
            userProjectsArr = this.props.userProjects
        } else {
            userProjectsArr = this.state.projects
        }
        if (this.props.userExperience) {
            userExperienceArr = this.props.userExperience
        } else {
            userExperienceArr = this.state.experience
        }
        if (this.props.userEducation) {
            userEducationArr = this.props.userEducation
        } else {
            userEducationArr = this.state.education
        }

        
        return (
                <UserCardContainer 
                    expanded={this.state.expanded ? true : false}
                    canEdit={this.props.canEdit ? true : false}>
                    <div className="userCardDiv">
                        <div className="top">
                            <div className="left-side">
                                <div className="bio">
                                    {this.props.image !== null ? 
                                        this.props.image !== "" ?
                                        <img className="photo" src={this.props.image} alt="user avatar"/> : 
                                        <div className="photo"><i className="fas fa-laptop"></i></div> :
                                                <div className="photo"><i className="fas fa-laptop"></i></div>
                                    }
                                    <div className="user-intro">
                                        <h2>{`${this.props.first_name} ${this.props.last_name}`}</h2>
                                        <p className="location">{this.props.location}</p>
                                        <p>{this.props.summary}</p>
                                     </div>
                                </div>
                                <h3>{this.props.desired_title}</h3>
                                <div className="keywords">
                                    {topSkillsArr.length > 0 ? topSkillsArr.map(word => {
                                        return (<div key={word.id} className={`${this.props.preview ? "skillsdelete" : null}`}>{this.props.preview ? <i onClick={() => this.deleteUserSkill("top_skills", word.id)} className="far fa-times-circle"></i> : null}<div className="keyword topskill">
                                            {word.skill}
                                        </div></div>)
                                    }) : null}
                                    {addSkillsArr.length > 0 ? addSkillsArr.map(word => {
                                        return (<div key={word.id} className={`${this.props.preview ? "skillsdelete" : null}`}>{this.props.preview ? <i onClick={() => this.deleteUserSkill("add_skills", word.id)} className="far fa-times-circle"></i> : null}<div className="keyword addskill">
                                            {word.skill}
                                        </div></div>)
                                    }) : null}
                                    {famSkillsArr.length > 0 ? famSkillsArr.map(word => {
                                        return (<div key={word.id} className={`${this.props.preview ? "skillsdelete" : null}`}>{this.props.preview ? <i onClick={() => this.deleteUserSkill("familiar", word.id)} className="far fa-times-circle"></i> : null}<div className="keyword famskill">
                                            {word.skill}
                                        </div></div>)
                                    }) : null}
                                </div>
                            </div>
                            <div className="links">
                                {this.props.badge !== null ? this.props.badge !== "acclaim.com" ? <a href={this.props.badgeURL}><img className="badge" src={this.props.badge} alt="acclaim badge"/></a> : null : null}
                                <a rel="noopener noreferrer" href={this.props.github} target="_blank"><i className="fab fa-github"></i></a>
                                <a rel="noopener noreferrer" href={this.props.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a>
                                <a rel="noopener noreferrer" href={this.props.portfolio} target="_blank"><i className="fas fa-code"></i></a>
                            </div>
                        </div>{/* top */}
                    </div>
                    <div>
                        {this.state.expanded ? 
                            <div className="projects-etc">
                                {/* ~~~~ projects ~~~~ */}
                                <h2>Projects</h2>
                                {userProjectsArr.map(project => 
                                    <div key={project.project_title} className="proj-etc-container" >
                                        <div className="project-top">
                                            <div className="project-left">
                                                <div className="extratitle">{project.project_title}</div>
                                                <a rel="noopener noreferrer" href={project.link} target="_blank">{project.link}</a>
                                            </div>
                                            <div className="project-right">
                                                {this.props.canEditPro ? <i onClick={()=> this.del("projects", project)} className="far fa-times-circle"></i> : null}
                                                {this.props.canEditPro ? <i onClick={()=> this.edit(project)} className="far fa-edit"></i> : null}
                                            </div>
                                        </div>
                                        <div className="proj-image-container">
                                            <img width="150px" height="min-height" src={project.project_img} alt="project"/>
                                            <div className="description">{project.project_description}</div>
                                        </div>
                                    </div>
                                )}
                                {/* ~~~~ experience ~~~~ */}
                                <h2>Experience</h2>
                                {userExperienceArr.map(experience => 
                                    <div key={experience.job_dates} className="proj-etc-container">
                                        <div className="project-top">
                                            <div className="project-left">
                                                <div className="extratitle">{experience.job_title}</div>
                                                <div className="dates">{experience.job_dates}</div>
                                                <div className="indent">{experience.job_description}</div>
                                            </div>
                                            <div className="project-right">
                                                {this.props.canEditExp ? <i onClick={()=> this.del("experience", experience)} className="far fa-times-circle"></i> : null}
                                                {this.props.canEditExp ? <i onClick={()=> this.edit(experience)} className="far fa-edit"></i> : null}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* ~~~~ education ~~~~ */}
                                <h2>Education</h2>
                                {userEducationArr.map(education => 
                                    <div key={education.school} className="proj-etc-container">
                                        <div className="project-top">
                                            <div className="project-left">
                                                <div className="extratitle">{education.school}</div>
                                                <div className="dates">{education.school_dates}</div>
                                                <div className="indent">{education.degree}</div>
                                                <div className="indent">{education.course}</div> 
                                            </div>
                                            <div className="project-right">
                                                {this.props.canEditEdu ? <i onClick={()=> this.del("education", education)} className="far fa-times-circle"></i> : null}
                                                {this.props.canEditEdu ? <i onClick={()=> this.edit(education)} className="far fa-edit"></i> : null}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>    
                        : null}
                        <div className="bottom" 
                            onClick={()=> this.setState({expanded: !this.state.expanded})} >
                            <i className={this.state.expanded?"fas fa-caret-up":"fas fa-caret-down"}></i>
                        </div>
                    </div>
                </UserCardContainer>
        )
    }
}

export default UserCard;
