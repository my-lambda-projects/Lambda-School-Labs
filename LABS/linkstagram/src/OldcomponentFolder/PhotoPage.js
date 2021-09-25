// import React, { Component } from 'react';
// import Imager from '../Helpers/Imager';
// import { base } from '../firebase';
// import StickyBox from 'react-sticky-box';
// import SideBar from './SideBar';

// export default class PhotoPage extends Component {
//     constructor(props) {
//         super(props);
//         this.updateLink = this.updateLink.bind(this);
//         this.state = {
//             links: [],
//             link: '',
//             title:'',
//         };
//     }
//     componentWillMount = () => {
//         this.linksRef = base.syncState('links', {
//             context: this,
//             state: 'links'
//         });
//       }
//     updateLink(e) {
//         const { links } = [...this.state.links]; 
//         const target = e.target;
//         const value = target.type === 'title' ? target.title : target.value;
//         const name = target.name;
    
//         this.setState ({
//             [name]: value  
//         }); 
//          links.push(this.state.link); 
//     }
//     //connect local store/state to firebase 'link' database which in this case is bitly urlshortner
   
//     //unsubscribe
//     componentWillUnmount = () => {
//       base.removeBiinding(this.linksRef);
//     }
    
    


// //image source will probably come directly from instafeed or thumbnails generated in firebase.
// //TODO still need to have some kind of submit method that will place all updated images together.
// render() {
//     return(
//         <div>
//           <SideBar />
//             <input type="text" name="title" placeholder="picture title" value={this.state.title}/>
//             <StickyBox width={350}>
//                 <Imager src={"../assets/Images/insta2.jpg"} width={150} height={150} mode={'fit'} />  
//             </StickyBox>
//             <div class="wrapper">
//                 <div class="c1">
//                     <input type="text" name="link" placeholder="add an external link" value={this.state.link} />
//                 </div>
//                 <div class="c2">
//                     <button onClick={()=>this.updateLink}><span>SUBMIT</span></button>
//                 </div>
//             </div>
//         </div>
//         )
//     }
// }