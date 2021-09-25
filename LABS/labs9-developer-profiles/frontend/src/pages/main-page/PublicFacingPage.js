import React, { Component } from "react";
import axios from "axios";
import FilterBox from "../../components/Filter/filter";
import UserCards from "../../components/user-card/UserCards";
import { PublicFacingPageDiv } from "./PublicFacingPage.style";

class PublicFacingPage extends Component {
    constructor(props) {
        super(props);
        //All elements that will be sent to the infinite scroll endpoint on the backend are stored in this state.
        //Tho they are not all initialized here.
        this.state = {
            filters: [],
            numCardsDisplaying: "all",
            // updateRequired: false,
            milesFrom: 5,
            //numOfResultsToReturn will update based on returned API call, this is also the initial return 
            numOfResultsToReturn: 6,
            //incrementNum is the initial load request and the amount to increment for api calls 
            incrementNum: 6,
            loading: true,
            cardsOnScreen: false,
            error: false,
            allUsers: [],
            modUsers: [],
            endOfUsers: false,
            locatedName: '',
            locatedLat: '',
            locatedLon: '',
            relocateName: '',
            relocateLat: '',
            relocateLon: '',
        }
    }

    componentDidMount(){
        this.filter(true)
    }

    filter = async (reset=false) => {
        let num;
        if(reset){
            await this.setState({
                endOfUsers: false,
                scrollToTop: true,
            })
            //resets to increment num is reset 
            num=this.state.incrementNum
        } else {
            //default is the next num i.e. if 6 is dislaying than 12 will be default
            num=this.state.numOfResultsToReturn
        }
        if(this.state.endOfUsers){
            return
        }
        let params = {
            filters: this.state.filters,
            locatedName: this.state.locatedCity,
            locatedLat: this.state.locatedLat,
            locatedLon: this.state.locatedLon,
            relocateName: this.state.relocateName,
            relocateLat: this.state.relocateLat,
            relocateLon: this.state.relocateLon,
            //this is the number of results to be returned from the API, not the current number
            numOfResultsToReturn: num,
            milesFrom: this.state.milesFrom,
        }

        this.setState({
            loading: true,
            scrollToTop: false,
        })
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/filter`, params).then(response => {
            this.setState({
                modUsers: response.data.usersArr,
                usersReturned: response.data.usersReturned,
                usersFound: response.data.usersFound,
                cardsOnScreen: true,
                loading: false,
                error: false,
                errorMsg: null,
            })
            if(response.data.usersFound === response.data.usersReturned){
                this.setState({
                    endOfUsers: true,
                })
            } else {
                this.setState({
                    numOfResultsToReturn: this.state.numOfResultsToReturn+this.state.incrementNum,
                })
            }
        }).catch(error => {
            this.setState({
                error: true,
                loading: false,
                errorMsg: error.message,
            })
            console.log(error)
        })
    }

    //this modifies state->filters the checkmarks array
    toggleCheckMarks = async name => {
        let newArr = this.state.filters;
        let newnew = []
        if(newArr.includes(name)){
            newnew = newArr.filter(item => item !== name);
        } else {
            newnew = newArr.concat(name);
        }
        await this.setState({
            filters: newnew,
            loading: true,
        })
        //this will be trigger new request to filter
        this.filter(true);
    };

    //this is used in child components to modify publicPageState state
    updatePublicPageState = async update => {
        if(update===false){
            console.log("update")
            this.setState({
                filters: [],
                locatedName: '',
                locatedLat: '',
                locatedLon: '',
                relocateName: '',
                relocateLat: '',
                relocateLon: '',
                numOfResultsToReturn: 6,
                milesFrom: 4,
            })
            this.filter(true)
        } else {
            console.log("update true")
            this.setState(update);
        }
    };

    render() {
        return (
            <PublicFacingPageDiv>
                <FilterBox
                    publicPageState={this.state}
                    toggleCheckMarks={this.toggleCheckMarks}
                    updatePublicPageState={this.updatePublicPageState}
                    filter={this.filter} />
                <UserCards
                    publicPageState={this.state}
                    updatePublicPageState={this.updatePublicPageState}
                    filter={this.filter} />
            </PublicFacingPageDiv>
        );
    }
}

export default PublicFacingPage;