 import React, {useState} from 'react';
 import { useFetch } from '../../helpers';
 import loadingIndicator from '../utils/loading.svg';

 import Responses from './Responses';
 import SRHeader from './SRHeader';
 import Properties from './Properties';
 import './images/profile_pic_default.png';
 import {SurveyResponseContainer} from './SurveyResponse.styling';
 

const SurveyResponse = (props:any) => {

const url =
process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com';

const [response, err, loading] = useFetch(`${url}/surveyresponses/${props.match.params.id}`, true, 'get');



let guestPic = () => {
    let sIndex = -1;
    for(let i=0; i< response.survey.length; i++){
        sIndex += 1;
    if(response.survey[sIndex].photo === null){
        response.survey[sIndex].photo = "https://nahealth.com/sites/default/files/styles/max_image_size/public/var/sites/nah/sites/default/files/media/profile-placeholder_0_0_0_0.png?itok=ywlRw7Li";
        }else{
            response.survey[sIndex].photo = response.survey[sIndex].photo;
        }
    } 
}

const [matches, setMatches] = useState(false);
let [property, setProperty] = useState("");

let changeHandler = (e:any) => {
    e.preventDefault();
    setMatches(true);
    setProperty(property = e.target.value);
    if(property === "title"){
        setMatches(false);
    }
}


let filteredSurveys = () => {
    let propertyMatches = [];
    if(matches===false){
        propertyMatches = response.survey;
    }else{
        for(let i=0; i<response.survey.length; i++){
            if(matches===true && property === response.survey[i].house_name){
                propertyMatches.push(response.survey[i]);
            }
        }
    }
    
    return propertyMatches;
}


if (loading === true) {
    return(
        <img src = {loadingIndicator} />
    )
}else if(response.survey.length === 0){
    return(
        <SRHeader surveys = {response.survey} />
    )
}else{
        return(
            <SurveyResponseContainer>
                <SRHeader surveys = {response.survey} />
                <Properties surveys = {response.survey} changeHandler ={changeHandler}/> 
                {filteredSurveys().map((survey: any, index:number) =>
                 <Responses key={index} survey={response.survey} 
                 sr_name={survey.guest_name} sr_date={survey.created_at} 
                 guestPic={guestPic()} sr_img={survey.photo} 
                 results={survey.results}/>
                 )}
                
                {console.log(response.survey)}
            </SurveyResponseContainer>
            )    
        }
    }
    


export default SurveyResponse;