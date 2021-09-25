
import React, { Component } from "react";
import OtherCarousel from "./OtherCarousel";
//import CarouselLoggedIn from "./CarouselLoggedIn";



class Carousel extends Component {
  render() {
    return(
      <div>
        <OtherCarousel />
      </div>
    );
  }


//class Carousel extends Component {

  //  render() {
    //    const isLoggedIn = this.state.isLoggedIn; 
      //  return(
        //    <div>
          //      {!isLoggedIn ? (
            //        <DefaultCarousel/> ) 
              //      : (
                //    <CarouselLoggedIn/>
               // )}
                //</div>
       // );
   // }

}
export default Carousel;
// render() {
//     const isLoggedIn = this.state.isLoggedIn;
//     return (
//       <div>{!isLoggedIn ? <DefaultCarousel /> : <CarouselLoggedIn />}</div>
//     );
//   }
// }
// export default Carousel;
