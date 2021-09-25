import React, { Component } from 'react';
import { FormGroup, Col, Input, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
import { BlockPicker } from 'react-color';
import Button from '@material-ui/core/Button';



class UpdateTeamModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      mascot: "",
      color: "",
      colorToggle: false,

    }
  }
  componentDidMount() {
    this.setState({
      teamName: this.props.team.name,
      mascot: this.props.team.mascot,
      color: this.props.team.color
    })
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex, colorToggle: !this.state.colorToggle });

  };

  colorToggle = event => {
    this.setState({
      colorToggle: !this.state.colorToggle
    })
  }

  updateTeam = event => {
    let team = {
      name: this.state.teamName,
      color: this.state.color,
      mascot: this.state.mascot
    }
    this.props.handleUpdate(this.props.index, team)
    this.props.updateToggleFunc()
  }

  render() {
    return (
      <Modal isOpen={this.props.updateToggle} toggle={this.props.updateToggleFunc}>
          <ModalHeader>Update Team: {this.state.teamName}</ModalHeader>
          <ModalBody>
            {/* <Col sm={3}> */}
              <Input  sm="4" type="text" name="teamName" placeholder="Team Name" defaultValue={this.state.teamName} onChange={this.changeHandler}/>
            {/* </Col> */}
            {/* <Col sm={3}> */}
              <Input sm="3" name="mascot" onChange={this.changeHandler} defaultValue={this.state.mascot} type="select">
                <option>Pick Mascot</option>
                <option value="🐝">🐝</option>
                <option value="🐶">🐶</option>
                <option value="🐈">🐈</option>
                <option value="🐎">🐎</option>
                <option value="🐍">🐍</option>
                <option value="🐋">🐋</option>
                <option value="🐊">🐊</option>
                <option value="🐘">🐘</option>
                <option value="🦒">🦒</option>
                <option value="🦆">🦆</option>
                <option value="🐇">🐇</option>
              </Input>
            {/* </Col> */}
            {/* <Col sm={3}> */}
              <Input onClick={this.colorToggle} placeholder="Pick a Color" defaultValue={this.state.color}/>
              <br/>
              <Col style={this.state.colorToggle ? null: {display: 'none'}}>
                <BlockPicker
                    color={ this.state.color }
                    onChangeComplete={ this.handleChangeComplete }
                />
              </Col>
            {/* </Col> */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.updateTeam} variant="contained" color="primary">Save</Button>
          </ModalFooter>
      </Modal>
    );
  }
}

export default UpdateTeamModal;