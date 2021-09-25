import React, {Component} from 'react';


class AddStore extends Component{
    constructor(){
        super();
        this.state = {
            lat:'',
            lng:'',
            address:'',
            staticMap:false,
        }
    }
    componentDidMount(){
        const inputElement = document.querySelector('.dropdown');
        console.log(inputElement);
        const dropdown = new window.google.maps.places.Autocomplete(inputElement);
        dropdown.addListener('place_changed',() => {
            const place = dropdown.getPlace();
            console.log(place);
            this.setState({lat:place.geometry.location.lat(),
                lng:place.geometry.location.lng(),
                address:'i changed',
                staticMap:true
            })
        })
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return(
            <div>
                {this.state.staticMap &&(<img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.lat},${this.state.lng}&zoom=14&size=800x150&key=AIzaSyCgxie-2MKM8N9ibIvYVGzuzvVSaXDonrE&markers=${this.state.lat},${this.state.lng}&scale=2`} alt="alt"/>)}
               
            <form>
                <input type="text" name="dropdown" class="dropdown"></input>
                <input type="text" name="address" onChange={this.handleChange} value={this.state.address} disabled></input>
                <input type="text" name="lat"onChange={this.handleChange}  value={this.state.lat} disabled></input>
                <input type="text" name="lng"onChange={this.handleChange}  value={this.state.lng} disabled></input>
            </form>
            </div>
        )
    }
}

export default AddStore;