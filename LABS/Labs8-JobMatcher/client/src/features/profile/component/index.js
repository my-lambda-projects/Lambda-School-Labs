import React from "react";

const BrowseElement = props => {
    console.log(props.data)
    return(
        <React.Fragment>
            {props.data &&
                 <div>
                    <h1>First-name: <em>{props.data.first_name}</em> <br/>Last-name:  <em>{props.data.last_name} </em></h1>
                    <h2>Title {props.data.is_employer ? " Employer" : "Seeker"} </h2>
                    <h3>email {props.data.email}</h3>
                    <h4>Id {props.data.id}</h4>
                </div>
            }
            <button onClick={props.onClick[1]}>Get seeker</button>
            <button onClick={props.onClick[0]}>Get Employer</button>
        </React.Fragment>

    )
}
export default BrowseElement;