import React, { Component } from "react";
import API from "../../../api";
import styled from "styled-components";
import JobCard from "./JobCard";
import JobModal from "./JobModal";
import ExplicitBaseCard from "../../../presentation/BLKTestCard";
import { toast } from "react-toastify";

const JobCardDeck = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
  .card:first-child {
    min-width: 0 !important;
    // height: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 70px;
    right: 20px;
    z-index: 100;
    border-radius: 50%;
    background-color: #ffffffd6;
    width: 125px;
    height: 125px;
    color: black;
    .card-title {
      color: black;
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

class Job extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      jobModal: false,
      jobSelected: false,
      jobFormData: {
        title: "",
        salary_min: 0,
        salary_max: 0,
        top_skills: "",
        extra_skills: "",
        familiar_with: "",
        description: "",
        requirements: "",
        is_active: ""
      }
    };
  }

  //Call the GET /jobs/ endoint to get all jobs from this employer:
  componentDidMount() {
    API.endpoints.jobs().then(res => {
      const jobs = res.data;
      this.setState({ jobs });
    });
  }

  //Toggle the Modal
  toggleJobModal = () => {
    this.setState(
      {
        jobModal: !this.state.jobModal
      },
      () => this.forceUpdate()
    );
  };

  //Handler that will fire each time a job card is clicked
  jobCardClickHandler = jobId => {
    if (jobId) {
      //Find the array Index with the jobId selected
      let jobSelected = this.state.jobs.filter(cv => cv.id === jobId)[0];

      //Set the Selected Job state:
      this.setState({ jobSelected });
    } else {
      //set the state to false:
      this.setState({ jobSelected: false });
    }

    this.toggleJobModal();
  };

  //Anytime a form element changes,handle the updating of state here:
  onFormChange = e => {
    // If the form element is checkbox, then set the checked to value:
    if (e.target.name === "is_active") {
      e.target.value = e.target.checked;
    }

    //Destructure each name/value
    const { name, value } = e.target;

    //Set the state
    this.setState({
      jobFormData: { ...this.state.jobFormData, [name]: value }
    });
  };

  //Method to translate all skills fields from a string to an array:
  skillsToArray = () => {
    let jobFormData = { ...this.state.jobFormData };

    //Use the space as the delimiter when converting strings to Arrays
    jobFormData.top_skills = jobFormData.top_skills
      ? jobFormData.top_skills.split(" ")
      : [];
    jobFormData.extra_skills = jobFormData.extra_skills
      ? jobFormData.extra_skills.split(" ")
      : [];
    jobFormData.familiar_with = jobFormData.familiar_with
      ? jobFormData.familiar_with.split(" ")
      : [];

    return jobFormData;
  };

  //Handler for creating a new job posting
  createJobHandler = () => {
    //Turn all skills fields into Arrays:
    let jobFormData = this.skillsToArray();

    //Make sure the is_active is set to something
    if (!jobFormData.is_active) jobFormData.is_active = false;

    //Call the createJob endpoint:
    API.endpoints
      .createJob(jobFormData)
      .then(res => {
        //Update the local state and add the job
        let jobs = [...this.state.jobs, res.data];
        toast.success("You created a job! Geeks are on the way");
        this.setState({ jobs });
      })
      .catch(error => {
        let errorMessageKeys = Object.keys(error.response.data);
        let errorMessageValue = Object.values(error.response.data);
        toast.error("ohh, adding job failed, Please try again!");
        let errorMessage = errorMessageKeys.map(
          (error, index) => `[${error}]: ${errorMessageValue[index][1]}`
        );
        toast.error(errorMessage.join(" "));
        console.log("Response Error: ", { error });
      });

    //Force a re-render / to load new state:
    this.setState({ state: this.state });
    this.forceUpdate();

    //Toggle the Modal
    this.toggleJobModal();
  };

  editJobHandler = () => {
    let { id } = this.state.jobSelected;

    //Turn all skills fields into Arrays:
    let jobFormData = this.skillsToArray();

    //Call the editJob endpoint:
    API.endpoints
      .updateJob(jobFormData, id)
      .then(res => {
        //Remove job that was edited
        toast.success("Job updated");
        let allJobsExceptEditedJob = [...this.state.jobs].filter(
          cv => cv.id !== id
        );

        let jobs = [...allJobsExceptEditedJob, res.data];
        this.setState({ jobs });
      })
      .catch(error => {
        toast.error("Job update failed");
        console.log("Job update failed", { error });
      });

    //Toggle the Modal
    this.toggleJobModal();
  };

  deleteJobHandler = () => {
    let { id } = this.state.jobSelected;

    //Call the editJob endpoint:
    API.endpoints
      .deleteJob(id)
      .then(res => {
        //Remove job
        toast.success("Job Deleted");
        let jobs = [...this.state.jobs].filter(cv => cv.id !== id);

        // Update the local state and add the job
        if (jobs) this.setState({ jobs });
        else console.log("no jobs to remove");
      })
      .catch(error => {
        toast.error("Job delete failed");
        console.log("Job delete failed", { error });
      });

    //Toggle the Modal
    this.toggleJobModal();
  };

  render() {
    //Destructure the state:
    const { jobs, jobModal, jobSelected } = this.state;

    return (
      <div>
        <JobCardDeck>
          <JobCard jobCardClickHandler={e => this.jobCardClickHandler(e)} />
          {jobs.map(job => (
            <ExplicitBaseCard
              key={job.id}
              id={job.id}
              title={job.title}
              name={`${job.employer.company_name}`}
              photo={job.employer.photo}
              summary={job.description}
              btn1Icon={"fas fa-archive"}
              btn1Name={"archived"}
              btn1color={"info"}
              btn4color={"success"}
              btn4Icon={"fas fa-edit"}
              btn4Name={"email"}
              btn1ClassName={"btn-simple"}
              btn1={() => toast.success("Coming soon")}
              btn4={e => this.jobCardClickHandler(e, job)} // ******************
              btn4ClassName={"btn-simple"}
              width={"300px"}
              is_valid={true}
              is_validbtn4={true}
              btnSizeForAll={"sm"}
              height={"auto"}
            />
          ))}
        </JobCardDeck>

        {/* If a value does not exist, check for existence before rendering */}
        <JobModal
          toggleJobModal={this.toggleJobModal}
          isOpen={jobModal}
          jobData={jobSelected ? jobSelected : false}
          createJobHandler={this.createJobHandler}
          editJobHandler={this.editJobHandler}
          deleteJobHandler={this.deleteJobHandler}
          onFormChange={this.onFormChange}
        />
      </div>
    );
  }
}

export default Job;
