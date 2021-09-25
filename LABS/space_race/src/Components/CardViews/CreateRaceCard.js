// import { Form, Text } from 'react-form';
// import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import TeamColorPicker from './TeamColorPicker';
// import ToggleRandom from './ToggleRandom';
// import { connect } from 'react-redux';
// import { shuffleArray } from '../../Actions/';
// import { createRace } from '../../Actions/createRace'
// import  InlineEditTrigger  from './InlineEditTrigger';

// class CreateRaceCard extends Component {

//   constructor( props ) {
//     super( props );
//     // this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleRandom = this.handleRandom.bind(this)
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     //sends the FormData object containing the form inputs to the api endpoint for the db to store.
    
//     // Data format for quiz
//     // {
//     //   "name": "name of quiz/race goes here",
//     //   "randomize_team": false
//     // }

//     // Data format for teams.. can be sent as an array
//     // [{
//     //   "name": "Awesome sauce",
//     //   "color": "yellow",
//     //   "mascot": "eagle"
//     // },
//     // {
//     //   "name": "Awesome sauce x 2",
//     //   "color": "blue",
//     //   "mascot": "eagle"
//     // }]
    
//     this.createRace(data.quiz, data.teams); 
//   }
  
//   render() {   
//     return (
//       <div className="card border-dark" style={{backgroundColor: 'rgba(189,245,252,0.2)'}}>
//       <div className="card-header" style={{height: 55}}>
//         <div className="col-auto">
//           <div className="row">
//             <div className="col-auto">
//               <h4>Race Info</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//         {/* <Form
//           onSubmit={this.handleSubmit}>
//           { formApi => (
//             <div style={{margin:'5px'}}>
//               <form onSubmit={formApi.submitForm} id="dynamic-form">
//                 <label  htmlFor="dynamic-first">Race Name</label>
//                 <InlineEditTrigger value={this.props.inlineValue}/>

//                 <button
//                 onClick={() => formApi.addValue('siblings', '')}
//                 type="button"
//                 className="mb-4 mr-4 btn btn-success" style={{margin: '10px'}}>Add Team</button>
//               </form>
//                 <h5 className="text-left bg-info" style={{margin: 10}}>Teams</h5>
//                 { formApi.values.siblings && formApi.values.siblings.map(( sibling, i ) => (
//                   <div style={{margin: '5px'}} key={`sibling${i}`}>
//                     <label htmlFor={`sibling-name-${i}`}>
//                       <select field={['siblings', i]} id={`sibling-name-${i}`}><optgroup label="Select Team"><option value="team1">Slytherin</option><option value="team2">Griffyndor</option><option value="team3">Hufflepuff</option><option value="team4">Ravenclaw</option></optgroup></select> </label>
//                     <label htmlFor={`sibling-name-${i}`}>
//                       <TeamColorPicker field={['siblings', i]} id={`sibling-name-${i}`} /></label>
//                       <select><optgroup placeholder= "select mascott" label="Select Mascott"><option value={12} >🐷</option><option value={13}>🍄</option><option value={14}>🧀</option></optgroup><option value={15}>🐓</option><option value={16}>🍍</option><option value={17}>🥑</option><option value={18}>🏁</option></select>
//                       <button style={{margin: '6px'}}className="mb-4 btn btn-primary"><i className="fa fa-pencil" data-bs-hover-animate="bounce"/></button>
//                       <button
//                         style={{margin: '6px'}}
//                         onClick={() => formApi.removeValue('siblings', i)}
//                         type="button"
//                         className="mb-4 btn btn-danger"
//                       >
//                           <i className="fa fa-trash-o" />
//                       </button>
//                   </div> 
//                 )
//               )
//             }
//               <div style={{margin: '10px'}} className="form-check"><label className="form-check-label" htmlFor="formCheck-1">Random Teams</label><input className="form-check-input" type="radio" id="formCheck-1" onClick={this.handleRandom} /></div>
//                 <div className="col-auto"><a className="btn btn-outline-primary" role="button" href="#Questions" style={{width: 225, margin: '10px'}}>On To Questions &nbsp;<i className="fa fa-space-shuttle" /></a></div>
//               </div>  
//           )
//         } 
//         </Form> */}
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     TeamsArray : state.teamsArray,
//     FormData: state.FormData
//   }
// }

// export default connect(mapStateToProps, { shuffleArray,  createRace})(CreateRaceCard);
