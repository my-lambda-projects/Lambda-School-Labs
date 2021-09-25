import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "../../../components/user-card/UserCard";

import { TextInput, TextArea } from "grommet";
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer,
  Validator,
  CardPreviewSection,
  MobileCardPreviewSection
} from "../styles/FormStyles";

import { oneToTwo, twoToOne } from '../dateHelpers'

var noLeaks;
class Experience extends Component {
  state = {
    submitSuccess: false,
    submitFailure: false,
    jobTitle: "",
    enableEdit: false,
    jobTitleValidation: true,
    jobDescription: "",
    jobDescriptionValidation: true,
    jobDatesFrom: "1936-04",
    jobDatesFromValidation: true,
    jobDatesTo: "1950-01",
    jobDatesToValidation: true,
    experience: this.props.userInfo.userExperience || []
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Checking package that will be sent for user info
  checkOnSubmit = e => {
    e.preventDefault();

    let months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };
    const { jobTitle, jobDatesFrom, jobDatesTo, jobDescription } = this.state;

    if (jobTitle === "") {
      this.setState({ jobTitleValidation: false });
      return;
    } else {
      this.setState({ jobTitleValidation: true });
    }

    if (jobDescription === "") {
      this.setState({ jobDescriptionValidation: false });
      return;
    } else {
      this.setState({ jobDescriptionValidation: true });
    }

    let newjobDatesFrom;
    if (jobDatesFrom !== "1936-04") {
      if (!jobDatesFrom) {
        this.setState({ jobDatesFromValidation: false });
        return;
      } else {
        newjobDatesFrom = jobDatesFrom.split("-");
        newjobDatesFrom = `${months[newjobDatesFrom[1]]} ${newjobDatesFrom[0]}`;
      }
    }
    if (!newjobDatesFrom) {
      this.setState({ jobDatesFromValidation: false });
      return;
    } else {
      this.setState({ jobDatesFromValidation: true });
    }

    let newjobDatesTo;
    if (jobDatesTo !== "1950-01") {
      if (!jobDatesTo) {
        newjobDatesTo = "Present";
      } else {
        newjobDatesTo = jobDatesTo.split("-");
        newjobDatesTo = `${months[newjobDatesTo[1]]} ${newjobDatesTo[0]}`;
      }
    }
    if (!newjobDatesTo) {
      this.setState({ jobDatesToValidation: false });
      return;
    } else {
      this.setState({ jobDatesToValidation: true });
    }

    let jobDates = `${newjobDatesFrom} to ${newjobDatesTo}`;

    const lePackage = {
      user_id: this.props.userInfo.id,
      job_title: jobTitle,
      job_dates: jobDates,
      job_description: jobDescription
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}/users/${
          this.props.userInfo.id
        }/experience`,
        lePackage
      )
      .then(res => {
        this.setState({
          submitSuccess: true,
          jobDescription: "",
          jobTitle: "",
          jobDatesFrom: "1936-04",
          jobDatesTo: "1950-01"
        });
        noLeaks = setTimeout(() => {
          this.setState({ submitSuccess: false });
        }, 2000);
        this.props.updateProgress();
      })
      .catch(err => {
        this.setState({ submitFailure: true });
        noLeaks = setTimeout(() => {
          this.setState({ submitFailure: false });
        }, 2000);
        console.log(err);
      });
  };

  componentWillUnmount() {
    clearTimeout(noLeaks);
  }

  editExtra = (edit) => {
    console.log(edit)
    let dates = oneToTwo(edit.job_dates)

    if(this.state.enableEdit){
        this.setState({
          enableEdit: false,
          jobId: null,
          jobDescription: '',
          jobTitle: '',
          jobDatesFrom: "1936-04",
          jobDatesTo: "1950-01"
        })
    } else {
        this.setState({
          enableEdit: true,
          jobId: edit.id,
          jobDescription: edit.job_description,
          jobTitle: edit.job_description,
          jobDatesFrom: dates.from,
          jobDatesTo: dates.to,
          job_dates: edit.job_dates,
        })
    }
  }

  submitEdit = () => {
    let dates = twoToOne(this.state.jobDatesFrom, this.state.jobDatesTo)
    const lePackage = {
      user_id: this.props.userInfo.id,
      id: this.state.jobId,
      job_title: this.state.jobTitle,
      job_dates: dates,
      job_description: this.state.jobDescription,
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/experience/${this.state.jobId}`, lePackage)
    .then(res => {
      window.location.reload()
    }).catch(err => {
      console.log(err.message)
    })
  }

  render() {
    return (
      <MainFormContainer>
        <header>
          <h1 className="main-heading">Experience</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>
              {/* jobtitle */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobTitle">Job Title:</label>
                </LabelContainer>
                <Validator validated={this.state.jobTitleValidation}>
                  <TextInput
                    id="userJobTitle"
                    name="jobTitle"
                    className="validated-text-input"
                    placeholder="Software Engineer"
                    focusIndicator
                    plain
                    value={this.state.jobTitle}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* jobdates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobDatesFrom">Job Dates From:</label>
                </LabelContainer>
                <Validator validated={this.state.jobDatesFromValidation}>
                  <TextInput
                    type="month"
                    min="1936-01"
                    id="userJobDatesFrom"
                    name="jobDatesFrom"
                    className="validated-text-input"
                    focusIndicator
                    plain
                    value={this.state.jobDatesFrom}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* jobdates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobDatesTo">Job Dates To:</label>
                </LabelContainer>
                <Validator validated={this.state.jobDatesToValidation}>
                  <TextInput
                    type="month"
                    id="userJobDatesTo"
                    name="jobDatesTo"
                    className="validated-text-input"
                    focusIndicator
                    plain
                    value={this.state.jobDatesTo}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* jobdescription */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobDescription">Job Description:</label>
                </LabelContainer>
                <Validator validated={this.state.jobDescriptionValidation}>
                  <TextArea
                    id="userJobDescription"
                    name="jobDescription"
                    className="validated-text-input"
                    placeholder="Here you can give a quick summary of your job duties! Max length is 128 characters"
                    maxLength="128"
                    style={{ height: "120px" }}
                    focusIndicator
                    plain
                    resize={false}
                    value={this.state.jobDescription}
                    onChange={this.onInputChange} />
                </Validator>
              </div>
            </form>
            <ButtonContainer>
                {this.state.enableEdit ? <button onClick={this.submitEdit}>Submit Edit</button> : null}
            </ButtonContainer>
          </FormSection>
          <CardPreviewSection>
            <header>
              <LabelContainer>
                <label>Profile Preview:</label>
              </LabelContainer>
            </header>
            <UserCard
              canEditExp
              canEdit
              enableEdit
              delExtra={this.props.delExtra}
              editExtra={this.editExtra}


              id={this.props.userInfo.id}
              github={this.props.userInfo.github}
              linkedin={this.props.userInfo.linkedin}
              portfolio={this.props.userInfo.portfolio}
              badge={this.props.userInfo.badge}
              key={this.props.userInfo.id}
              first_name={this.props.userInfo.first_name}
              last_name={this.props.userInfo.last_name}
              image={this.props.userInfo.image}
              summary={this.props.userInfo.summary}
              desired_title={this.props.userInfo.desired_title}
              location={this.props.userInfo.current_location_name}
              userExperience={this.props.userInfo.userExperience}
            />
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <Link to="/dashboard/projects">Back</Link>
          <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ? (
              <i className="success fa fa-check-circle fa-2x" />
            ) : (
              "Save Info"
            )}
          </button>
          <Link to="/dashboard/education">Next</Link>
        </ButtonContainer>
        <MobileCardPreviewSection>
          <header>
            <LabelContainer>
              <label>Profile Preview:</label>
            </LabelContainer>
          </header>
          <UserCard
            id={this.props.userInfo.id}
            github={this.props.userInfo.github}
            linkedin={this.props.userInfo.linkedin}
            portfolio={this.props.userInfo.portfolio}
            badge={this.props.userInfo.badge}
            key={this.props.userInfo.id}
            first_name={this.props.userInfo.first_name}
            last_name={this.props.userInfo.last_name}
            image={this.props.userInfo.image}
            summary={this.props.userInfo.summary}
            desired_title={this.props.userInfo.desired_title}
            location={this.props.userInfo.current_location_name}
            userTopSkills={this.props.userInfo.userTopSkills}
            userAddSkills={this.props.userInfo.userAddSkills}
            userFamSkills={this.props.userInfo.userFamSkills}
          />
        </MobileCardPreviewSection>
      </MainFormContainer>
    );
  }
}

export default Experience;
