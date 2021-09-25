import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { addRecipe, autoComIng, resetAutoCom, getAllergies } from '../actions';
import { Form, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import ourColors from '../ColorScheme';
import FileDropFunc from './FileDrop';

// const AutoComDiv = styled.div`
//   width: 500px;
//   position: relative;
//   display: inline-block;
// `;

const AutoComItemsDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 35px;
  border: 1px solid #d4d4d4;
  z-index: 10;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
    height: 25px;
    padding-left: 13.7px;
  }
`;

const AddNewRecipeFormDiv = styled.div`
  width: 95%;
  margin-left: 2.5%;
  font-family: Roboto;
  .quill-div {
    min-height: 150px;
  }
`;

const emptyIng = { name: '', quantity: '', unit: '', unitsList: [] };

class AddNewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      numIngredients: 3,
      selectedFile: null,
      imageUrl: '',
      imageName: '',
      dragging: false,
      ingredients: [emptyIng, emptyIng, emptyIng],
      focuses: [{ focus: false }, { focus: false }, { focus: false }],
      edamam: 'https://api.edamam.com/api/food-database',
      edamamAppId: '4747cfb2',
      edamamAppKey: process.env.REACT_APP_EDAMAMAPP_KEY
    };

  }

  dragEventCounter = 0;

  componentDidMount() {
    this.props.getAllergies();
    // image upload lifecycle
    window.addEventListener("dragover", ev  => {
      this.overRideEventDefaults(ev);
    });
    window.addEventListener('drop', ev => {
      this.overRideEventDefaults(ev);
    });

  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.overRideEventDefaults);
    window.removeEventListener('drop', this.overRideEventDefaults);
  
  }
  

  quillHandler = html => {
    this.setState({ description: html });
  };

  typingHandler = e => {
    if (e.target.name === 'numIngredients') {
      // numIngredients needs certain logic
      let prevNumIng;
      const value = e.target.value; // declared since lost in async setState
      this.setState(prevState => {
        prevNumIng = prevState.numIngredients; // getting prevNumIng for later use
        if (prevNumIng > value) {
          return {
            numIngredients: value,
            ingredients: this.state.ingredients.slice(0, value),
            focuses: this.state.focuses.slice(0, value)
          };
        } else if (prevNumIng < value) {
          let otherIng = [];
          let otherFoc = [];
          for (let i = 0; i < value - prevNumIng; i++) {
            // getting extra rows for ing and foc
            otherIng.push(emptyIng);
            otherFoc.push({ focus: false });
          }
          return {
            numIngredients: value,
            ingredients: [...this.state.ingredients, ...otherIng],
            focuses: [...this.state.focuses, ...otherFoc]
          };
        } else {
          return { numIngredients: value };
        }
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  ingHandler = ev => {
    // Get which ingredient form field type is being handled: name, quty, or unit
    let rowType = ev.target.name.slice(0, 4);
    if (rowType === 'quty') {
      rowType = 'quantity';
    }
    // Get what number of row on the form is being handled
    let rowNum = Number(ev.target.name.slice(4));

    if (rowNum >= this.state.ingredients.length) {
      // If the user is creating a new ingredient
      let newObj = { [rowType]: ev.target.value }; // Make a new ingredient object
      this.setState({
        ingredients: [
          ...this.state.ingredients,
          newObj // Add new ingredient object to end of array in state
        ]
      });
      if (rowNum > this.state.ingredients.length) {
        ev.target.blur(); // Force them not to skip rows in the table
      }
    } else {
      // If modifying an ingredient that's already in state
      let ingArray = this.state.ingredients.slice();
      let oldObj = ingArray[rowNum];
      let newObj = {
        ...oldObj,
        [rowType]: ev.target.value
      };
      ingArray[rowNum] = newObj;
      this.setState({
        ingredients: ingArray
      });
    }
  };

  submitHandler = ev => {
    ev.preventDefault();
    // Convert quantities to numbers
    let ingArray = this.state.ingredients;
    for (let i = 0; i < ingArray.length; i++) {
      ingArray[i].quantity = Number(ingArray[i].quantity);
    }

    // Package up the recipe object to be sent to the API
    // eslint-disable-next-line
    const firebaseid = localStorage.getItem('uid');
    let recipeObj = {
      name: this.state.name,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      firebaseid,
      ingredients: ingArray
    };
    // Call the action to send this object to POST a recipe
    this.props.addRecipe(recipeObj);
    this.setState({
      name: '',
      description: '',
      imageUrl: '',
      ingredients: [emptyIng, emptyIng, emptyIng]
    });
    this.props.history.push('/recipes');
  };

  onClickAutocomplete = (i, item) => {
    let ingredients = this.state.ingredients.slice();
    ingredients[i].name = item;
    this.setState({ ingredients }); // changing ingredient in state
    this.props.resetAutoCom(); // resets autoCom so menu will disappear
    this.onBlur(i); // changes focus to false
    this.checkAutoComUnits(i, item);
  };

  onFocus = index => {
    let focuses = this.state.focuses.slice();
    focuses[index].focus = true;
    this.setState({ focuses });
  };

  onBlur = index => {
    let focuses = this.state.focuses.slice();
    focuses[index].focus = false;
    this.setState({ focuses });
  };

  checkUnits = ev => {
    if (ev.target.value !== '') {
      const ingNum = Number(ev.target.name.slice(4));
      const encoded = encodeURIComponent(ev.target.value);
      const url = `${this.state.edamam}/parser?ingr=${encoded}&app_id=${
        this.state.edamamAppId
      }&app_key=${this.state.edamamAppKey}`;
      const unitArr = [];
      axios
        .get(url)
        .then(res => {
          const hints = res.data.hints;
          if (hints.length) {
            hints[0].measures.map(measure => {
              unitArr.push(measure.label);
              return null;
            });
          } else {
            unitArr.push('Gram');
          }
          const ingCopy = this.state.ingredients.slice();
          ingCopy[ingNum].unitsList = unitArr;
          ingCopy[ingNum].unit = unitArr[0];
          this.setState({ ingredients: ingCopy });
        })
        .catch(err => {
          console.log({ error: err });
        });
    }
  };

  checkAutoComUnits = async (i, item) => {
    try {
      const encoded = encodeURIComponent(item);
      const url = `${this.state.edamam}/parser?ingr=${encoded}&app_id=${
        this.state.edamamAppId
      }&app_key=${this.state.edamamAppKey}`;
      const unitArr = [];
      const res = await axios.get(url);
      res.data.hints[0].measures.map(measure => {
        unitArr.push(measure.label);
        return null;
      });
      const ingCopy = this.state.ingredients.slice();
      ingCopy[i].unitsList = unitArr;
      ingCopy[i].unit = unitArr[0];
      this.setState({ ingredients: ingCopy });
    } catch (err) {
      console.log(err);
    }
  };

  ingAllergyWarning = index => {
    const boolArr = this.props.allergies.map(
      allergy => allergy === this.state.ingredients[index].name
    );
    if (boolArr.includes(true)) {
      return { background: 'red' };
    } else {
      return {};
    }
  };

  handleFileUpload = ev => {
    ev.preventDefault();
    //if user clicks upload with no image this will catch that and not break the code
  
    if (!this.state.selectedFile || !this.state.selectedFile[0]) {
      this.setState({ imageUrl: '' });
    } else {
      // console.log("selected File",this.state.selectedFile);
      const URL = 'https://donteatthat.herokuapp.com/api/image-upload/';
      const formData = new FormData();
      formData.append('image', this.state.selectedFile[0]);
      console.log("name of Image", this.state.selectedFile[0].name);
      axios
        .post(URL, formData)
        .then(res => {
          this.setState({ imageUrl: res.data.imageUrl });
          alert('Image ready to upload!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleInputSelectedFile = ev => {
    ev.preventDefault();
    this.setState({
      selectedFile: ev.target.files

    });
    // console.log("upload image name",ev.target.files.name);
  };


  dragLeaveListener = ev => {
    this.overRideEventDefaults(ev);
    this.dragEventCounter--;
    console.log("Leaving", this.dragEventCounter);
    if(this.dragEventCounter === 0) {
      this.setState({dragging: false});
    }
  };
  
  dropListener = ev => {
    this.overRideEventDefaults(ev);
    this.dragEventCounter = 0;
    this.setState({dragging:false});
    if(ev.dataTransfer.files) {  
      this.setState({selectedFile: ev.dataTransfer.files,
      imageName: ev.dataTransfer.files[0].name})
      
      // console.log("dropListener",this.state.selectedFile);
    }
    // console.log("upload image name",ev.dataTransfer.files[0].name);
  };
  
  overRideEventDefaults = ev => {
    ev.preventDefault();
    ev.stopPropagation();
  };
  
  onSelectFileClick = (ev) => {
    this.overRideEventDefaults(ev)
    this.fileUploaderInput() && this.fileUploaderInput.click();
  };
    
  onFileChange = ev => {  
    console.log("file change", ev.target.files);
    if (ev.target.files && ev.target.files[0]) {
      this.setState({selectedFile:ev.target.files[0]});
    }
  };





  render() {
    // Build the array of HTML inputs that will get inserted into the form
    let ingredientRows = [];
    for (let i = 0; i < this.state.numIngredients; i++) {
      const unitOptions = [];
      this.state.ingredients[i].unitsList.map(unit =>
        unitOptions.push({ value: unit, text: unit })
      );
      ingredientRows.push(
        <Form.Group key={`row${i}`}>
          <Form.Input width='8' onBlur={this.checkUnits} name={`name${i}`}>
            {/* <AutoComDiv> */}
            <input
              type='text'
              placeholder='Ingredient Name'
              name={`name${i}`}
              value={this.state.ingredients[i].name}
              autoComplete='new-password'
              onChange={e => {
                this.ingHandler(e);
                this.props.autoComIng(this.state.ingredients[i].name);
              }}
              onFocus={() => this.onFocus(i)}
              // onBlur={this.checkUnits}
              style={this.ingAllergyWarning(i)}
            />
            {this.props.autoCom && this.state.focuses[i].focus && (
              <AutoComItemsDiv>
                {this.props.autoCom.map(item => {
                  return (
                    <div
                      key={item}
                      onClick={e => this.onClickAutocomplete(i, item, e)}
                    >
                      {item}
                    </div>
                  );
                })}
              </AutoComItemsDiv>
            )}
            {/* </AutoComDiv> */}
          </Form.Input>
          <Form.Input width='3'>
            <input
              type='text'
              placeholder='Quantity'
              name={`quty${i}`}
              value={this.state.ingredients[i].quantity}
              onChange={this.ingHandler}
              onFocus={() => this.onBlur(i)}
            />
          </Form.Input>
          <Form.Select width='5' placeholder='Unit' options={unitOptions} />
        </Form.Group>
      );
    }
    return (
      <AddNewRecipeFormDiv>
        <Segment style={{ background: ourColors.formColor }}>
          <Header as='h1'>Upload New Recipe</Header>
          <Form onSubmit={this.submitHandler} autoComplete='off' size='tiny'>
            <Form.Group
              widths='equal'
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <Form.Field width='12'>
                <input
                  type='text'
                  placeholder='Recipe Name'
                  name='name'
                  id='recipe-name'
                  value={this.state.name}
                  onChange={this.typingHandler}
                  required
                />
              </Form.Field>
              <Form.Field width='4'>
                <label htmlFor='numIngredients'>Number of Ingredients:</label>
                <input
                  type='number'
                  placeholder='3'
                  name='numIngredients'
                  id='numIngredients'
                  value={this.state.numIngredients}
                  onChange={this.typingHandler}
                />
              </Form.Field>
            </Form.Group>
            {ingredientRows}
            <FileDropFunc
              dragging={this.state.dragging}
              file={this.state.selectedFile}
              selectedFile={this.state.selectedFile}
              onSelectFileClick={this.onSelectFileClick}
              onDrag={this.overRideEventDefaults}
              onDragStart={this.overRideEventDefaults}
              onDragEnd={this.overRideEventDefaults}
              onDragOver={this.overRideEventDefaults}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={this.dropListener}
              handleFileUpload={this.handleFileUpload}
              handleInputSelectedFile={this.handleInputSelectedFile}
              onFileChange={this.onFileChange}
              imageName={this.state.imageName}
            />

            <Form.Field
              className='quill-div'
              width='16'
              style={{ marginTop: '14px', marginBottom: '14px' }}
            >
              <ReactQuill
                value={this.state.description}
                onChange={html => this.quillHandler(html)}
                modules={AddNewRecipeForm.modules}
                formats={AddNewRecipeForm.formats}
                style={{
                  minHeight: '150px',
                  background: 'white',
                  color: 'black'
                }}
              />
            </Form.Field>
            {(!this.state.name || !this.state.description || !this.state.ingredients[0].name ||
              !this.state.ingredients[0].quantity) && (
              <p className='please-provide'>
                Please provide a name, description, and an ingredient before
                submitting a recipe!
              </p>
            )}
            {localStorage.getItem('uid') ? (
              !this.state.name ||
              !this.state.description ||
              !this.state.ingredients[0].name ||
              !this.state.ingredients[0].quantity ? (
                <Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Button type='submit' disabled style={{ background: ourColors.inactiveButtonColor, color: 'white' }}>
                    Save Recipe
                  </Form.Button>
                  <Form.Button
                      onClick={() => this.props.history.push('/recipes')}
                      style={{
                        background: ourColors.inactiveButtonColor,
                        color: 'white',
                        width: '133px'
                      }}
                    >
                      Cancel
                    </Form.Button>
                </Form.Group>
              ) : (
                <Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Button
                    type='submit'
                    style={{ background: ourColors.buttonColor, color: 'white' }}
                  >
                    Save Recipe
                  </Form.Button>
                  <Form.Button
                      onClick={() => this.props.history.push('/recipes')}
                      style={{
                        background: ourColors.inactiveButtonColor,
                        color: 'white',
                        width: '133px'
                      }}
                    >
                      Cancel
                    </Form.Button>
                </Form.Group>
              )
            ) : (
              <React.Fragment>
                <Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Button type='submit' disabled style={{ background: ourColors.inactiveButtonColor, color: 'white' }}>
                    Save Recipe
                  </Form.Button>
                  <Form.Button
                      onClick={() => this.props.history.push('/recipes')}
                      style={{
                        background: ourColors.inactiveButtonColor,
                        color: 'white',
                        width: '133px'
                      }}
                    >
                      Cancel
                    </Form.Button>
                </Form.Group>
                <p>Please Log In to Add a Recipe!</p>
              </React.Fragment>
            )}
          </Form>
        </Segment>
      </AddNewRecipeFormDiv>
    );
  }
}

AddNewRecipeForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
AddNewRecipeForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link'
];

const mapStateToProps = state => {
  return {
    autoCom: state.nutritionReducer.autoComIng,
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { addRecipe, autoComIng, resetAutoCom, getAllergies }
)(AddNewRecipeForm);
