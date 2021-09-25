import React,{useState} from "react";
import { ReactComponent as BackArrow } from "../../assets/img/back.svg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getVehicles, deleteVehicles,updateVehicle } from "../../store/actions";
import { selectVehicle } from "../../store/actions/selectVehicle.js";
import {ReactComponent as Exit} from "../../assets/img/Exit.svg";
import {ReactComponent as Trash} from "../../assets/img/trash.svg";
import {ReactComponent as Edit} from "../../assets/img/darkIcons/edit.svg";
import VehicleFormDropDown from "./VehicleFormDropDown.js";
import UpdateVehicleForm from "./UpdateVehicleForm.js";
import Button from "react-bootstrap/Button";
import "./Vehicles.css";
import axios from "axios";

// Vehicles loading in harmburger menu and functionality for toggle edit and delete buttons. sends this state to update form for auto populate

class Vehicles extends React.Component {
  state = {
    id: null,
    editing: false,
    on:false,
    edit:false,
    updateForm:false,
    specifications: {
      name: "",
       height: "", // value that gets sent to the backend, after combinining heightFeet and heightInches into one unit
      heightFeet: undefined, // value that stores the user entry of height in feet
      heightInches: "", // value that stores the user entry of height in inches
        width: "", // these 3 width values follow the same structure as height
      widthFeet: "",
      widthInches: "",
         length: "", // these 3 length values follow the same structure as height
      lengthFeet: "",
      lengthInches: "",
      weight: "", //this will be sent in pounds? check BE docs
      axel_count: "", //integer, unit implied
      vehicle_class: "", //controlled input of one letter
      //created_at: '', //check BE for format, generate date with js
      dual_tires: false, //Bool, checkbox
      trailer: false, //Bool, checkbox
      isSignedIn: false
    }
  };

  componentDidMount() {
    this.props.getVehicles();
  }

  //checks if the edit button on a vehicle has been clicked
  editVehicleToggle = id => {
    this.setState({
      id,
      editing: !this.state.editing
    });
  };

  clearForm = () => {
    this.setState({
      id: null,
      editing: false
    });
  };

  

  // selected = id => {
  //   //Google analytics tracking
  //   window.gtag("event", "select vehicle", {
  //     event_category: "select",
  //     event_label: "select vehicle"
  //   });
  //   this.props.selectVehicle(id);
  // };
  // deselect = () => {
  //   //Google analytics tracking
  //   window.gtag("event", "deselect vehicle", {
  //     event_category: "select",
  //     event_label: "deselect vehicle"
  //   });
  //   this.props.selectVehicle(null);
  // };

  

toggle = () =>{
    this.setState({
        on:!this.state.on
    })
}

toggleEdit = () =>{
  this.setState({
      edit:!this.state.edit
  })
}

toggleUpdateForm = () =>{
  this.setState({
      updateForm:!this.state.updateForm
  })
}

splitDistanceUnits = (combined) => {
  let realFeet = combined;

  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  };

Update = (id) => {
    
   
 return axios
   .get(
    //  `${process.env.REACT_APP_BASE_URL}/vehicle`
    `https://labs15rvlife.herokuapp.com/vehicle`
   , {
     headers: { Authorization: localStorage.getItem("token") },
     "Content-Type": "application/json"
   })
   .then(res => {
     console.log("update vehicle res", res.data); // data was created successfully and logs to console

     res.data &&
         res.data.map(e => {
           console.log("e",e)
           if(id === e.id){
             console.log("ID",id)
             console.log("e.ID",e.id)

             this.setState({
               specifications:e
           })
           //To split combined feet and inches from returned value from backend
           let heightFeetNew = Math.floor(e.height)
           let heightInchesNew = Math.round((e.height - heightFeetNew) * 12 )
           let widthFeetNew = Math.floor(e.width)
           let widthInchesNew = Math.round((e.width - widthFeetNew) * 12 )
           let lengthFeetNew = Math.floor(e.length)
           let lengthInchesNew = Math.round((e.length - lengthFeetNew) * 12 )
           
           this.setState({
            specifications:{
              heightFeet:heightFeetNew,
              heightInches:heightInchesNew,
              widthFeet:widthFeetNew,
              widthInches:widthInchesNew,
              lengthFeet:lengthFeetNew,
              lengthInches:lengthInchesNew,
              weight:e.weight,
              name:e.name,
              axel_count:e.axel_count,
              vehicle_class:e.vehicle_class,
              dual_tires:e.dual_tires,
              trailer:e.trailer,
              id:e.id
            }
        })
           this.toggleUpdateForm()
           console.log("specfications",this.state.specifications)
           }     
         })
   })
   .catch(err => {
     console.log("get vehicle err", err); // there was an error creating the data and logs to console
   });
  
};


  render() {
    console.log("vehiclejs props", this.props);
    return (
      <>
      <div className="toggle-parent-vehicle">
        {/* If on === true then renders component */}
            {this.state.on && 
                <VehicleFormDropDown  toggle={this.toggle}/>
            }
        </div>
        <div className="toggle-parent-vehicle">
          {/* If updateForm === true then renders component */}
            {this.state.updateForm && 
                <UpdateVehicleForm   specifications={this.state.specifications} toggleUpdateForm={this.toggleUpdateForm}/>
            }
        </div>
      <div className="menu-vehicle">
        <div  id="dropdown-split-basic-vehicle" className="hamcolor-vehicle">
                  <div className='hamend-vehicle'>RV WAY </div>
                  <div className="Exit-vehicles" onClick={this.props.toggle}><Exit/></div>
              </div>
        <div className="back-vehicle">
            <BackArrow />

            <p
              className="vehicleFormBackContainer-vehicle"
              id="routing-vehicle"
              onClick={this.props.toggle}
            >
              Back
            </p>

            <p className="back-label-vehicle">My Vehicles</p>
          </div>
          <div className="add-delete-vehicles">
              <span className="button-style-one-vehicle" onClick={this.toggle}>ADD</span>
              <span className="button-style-two-vehicle" onClick={this.toggleEdit}>EDIT</span>
          </div>
          <div className="form-wrapper-vehicle">
            {this.props.vehicles.vehicles &&
            this.props.vehicles.vehicles.map(e => {
              
              if(this.state.edit === false){
                return <div className="vehicle-layout">
                  <p className="vehicle-name">{e.name}</p>
                </div>
              }else if(this.state.edit === true){
                return <div className="vehicle-layout">
                  <div className="name-parent">
                    <p className="vehicle-name">{e.name}</p>
                  </div>
                  
                  <div className="delete-edit">
                    <Trash onClick={() => this.props.deleteVehicles(e.id)} className="deleteSVG"/>
                    <Edit onClick={() => this.Update(e.id)} />
                  </div>
                  
                </div>
              }
              
  })}
          </div>
        </div>
        </>
      
    );
  }
  
}
 
const mapStateToProps = state => ({
  vehicles: state.vehicles,
  selected_id: state.selected_id
});

export default withRouter(
  connect(mapStateToProps, { getVehicles, deleteVehicles, selectVehicle,updateVehicle })(
    Vehicles
  )
);
