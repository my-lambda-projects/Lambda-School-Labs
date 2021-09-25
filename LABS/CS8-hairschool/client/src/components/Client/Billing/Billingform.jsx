import React, {Component} from 'react';
import { Button, Form, FormGroup, FormText, Label, Input, Row, Col } from 'reactstrap';   
import {HelpBlock} from 'react-bootstrap';          

class Billing2 extends Component{
     

myClick = () =>  {
    alert("Thank You for Your Payment!");
}
render(){
    return(
        <div>
        <Form>
        <FormGroup className="FormLeft">
        <Row>
        <Col sm="3">
            <FormGroup>
                <Label for="email">Cardholder's Full Name: </Label>
                <Input type="text" name="email" />
            </FormGroup>
        </Col>
        <Col sm="3">
            <FormGroup>
                <Label>Card Number:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
        </Col>
        <Col sm="3">
            <FormGroup>
                <Label>EXP:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
        </Col>
        <Col sm="3">
            <FormGroup>
                <Label>CCV Number:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
        </Col>
            </Row>
            <Row>
            <Col sm="12">
            <FormGroup>
                <Label>Billing Address:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col sm="3">
            <FormGroup>
                <Label>City:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
            </Col>
            <Col sm="3">
            <FormGroup>
                <Label>State/Province:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
            </Col>
            
        <Col sm="3">
            <FormGroup>
        <Label for="selectingStylists">Country: </Label>
        <Input type="select" name="Country" placeholder="Country"> 
            <FormText color="muted">Country</FormText>
            <option>Afghanistan</option>
            <option>Albania</option>
            <option>Algeria </option>
            <option>Andorra</option>
            <option>Angola</option>
            <option>Anguilla</option>
            <option>Antigua & Barbuda</option>
            <option>Argentina</option>
            <option>Armenia</option>
            <option>Australia</option>
            <option>Austria</option>
            <option>Azerbaijan</option>
            <option>Bahamas</option>
            <option>Bahrain</option>
            <option>Bangladesh</option>
            <option>Barbados</option>
            <option>Belarus</option>
            <option>Belgium</option>
            <option>Belize</option>
            <option>Benin</option>
            <option>Bermuda</option>
            <option>Bhutan</option>
            <option>Boliviav</option>
            <option>Bosnia & Herzegovina</option>
            <option>Botswana</option>
            <option>Brazil</option>
            <option>Brunei Darussalam</option>
            <option>Bulgaria</option>
            <option>Burkina Faso</option>
            <option>Myanmar/Burma</option>
            <option>Burundi</option>
            <option>Cambodia</option>
            <option>Cameroon</option>
            <option>Canada</option>
            <option>Cape Verde</option>
            <option>Cayman Islands</option>
            <option>Central African Republic</option>
            <option>Chad</option>
            <option>Chile</option>
            <option>China</option>
            <option>Colombia</option>
            <option>Comoros</option>
            <option>Congo</option>
            <option>Costa Rica</option>
            <option>Croatia</option>
            <option>Cuba</option>
            <option>Cyprus</option>
            <option>Czech Republic</option>
            <option>Democratic Republic of the Congo</option>
            <option>Denmark</option>
            <option>Djibouti</option>
            <option>Dominica</option>
            <option> Dominican Republic</option>
            <option> Ecuador</option>
            <option>Egypt</option>
            <option>El Salvador</option>
            <option>Equatorial Guinea</option>
            <option>Eritrea</option>
            <option>Estonia</option>
            <option>Ethiopiav</option>
            <option>Fiji</option>
            <option>Finland</option>
            <option>France</option>
            <option> French Guiana</option>
            <option>Gabon</option>
            <option>Gambia</option>
            <option> Georgia</option>
            <option>Germany</option>
            <option>Ghana</option>
            <option>Great Britain</option>
            <option>Greece</option>
            <option>Grenada</option>
            <option>Guadeloupe</option>
            <option>Guatemala</option>
            <option>Guinea</option>
            <option>Guinea-Bissau</option>
            <option>Guyana</option>
            <option>Haiti</option>
            <option>Honduras</option>
            <option>Hungary</option>
            <option>Iceland</option>
            <option>India</option>
            <option>Indonesia</option>
            <option>Iran</option>
            <option>Iraq</option>
            <option>Israel and the Occupied Territories</option>
            <option>Italy</option>
            <option>Ivory Coast (Cote d'Ivoire)</option>
            <option>Jamaica</option>
            <option>Japan</option>
            <option>Jordan</option>
            <option>Kazakhstan</option>
            <option>Kenya</option>
            <option> Kosovo</option>
            <option> Kuwait</option>
            <option>Kyrgyz Republic (Kyrgyzstan)</option>
            <option>Laos</option>
            <option>Latvia</option>
            <option>Lebanon</option>
            <option> Lesotho</option>
            <option> Liberia</option>
            <option> Libya</option>
            <option> Liechtenstein</option>
            <option> Lithuania</option>
            <option> Luxembourg</option>
            <option> Republic of Macedonia</option>
            <option> Madagascar</option>
            <option> Malawi</option>
            <option> Malaysia</option>
            <option> Maldives</option>
            <option> Mali</option>
            <option> Malta</option>
            <option> Martinique</option>
            <option> Mauritania</option>
            <option>Mauritius</option>
            <option> Mayotte</option>
            <option> Mexico</option>
            <option> Moldova, Republic of</option>
            <option>Monaco</option>
            <option> Mongolia</option>
            <option> Montenegro</option>
            <option> Montserrat</option>
            <option> Morocco</option>
            <option> Mozambique</option>
            <option>  Namibia</option>
            <option> Nepal</option>
            <option> Netherlands</option>
            <option> New Zealand</option>
            <option>  Nicaragua</option>
            <option>  Niger</option>
            <option> Nigeria</option>
            <option> Korea, Democratic Republic of (North Korea)</option>
            <option> Norway</option>
            <option> Oman</option>
            <option>Pacific Islands</option>
            <option>  Pakistan</option>
            <option>  Panama</option>
            <option>  Papua New Guinea</option>
            <option>  Paraguay</option>
            <option>  Peru</option>
            <option> Philippines</option>
            <option> Poland</option>
            <option> Portugal</option>
            <option> Puerto Rico</option>
            <option> Qatar</option>
            <option> Reunion</option>
            <option> Romania</option>
            <option> Russian Federation</option>
            <option> Rwanda</option>
            <option>Saint Kitts and Nevis</option>
            <option> Saint Lucia</option>
            <option> Saint Vincent's & Grenadines</option>
            <option> Samoa</option>
            <option> Sao Tome and Principe</option>
            <option> Saudi Arabia</option>
            <option> Senegal</option>
            <option> Serbia</option>
            <option> Seychelles</option>
            <option> Sierra Leone</option>
            <option> Singapore</option>
            <option>Slovak Republic (Slovakia)</option>
            <option>Slovenia</option>
            <option>Solomon Islands</option>
            <option> Somalia</option>
            <option> South Africa</option>
            <option> Korea, Republic of (South Korea)</option>
            <option> South Sudan</option>
            <option>Spain</option>
            <option>Sri Lanka</option>
            <option>Sudan</option>
            <option>Suriname</option>
            <option>Swaziland</option>
            <option>Sweden</option>
            <option>Switzerland</option>
            <option>Syria</option>
            <option>Tajikistan</option>
            <option>Tanzania</option>
            <option>Thailand</option>
            <option>Timor Leste</option>
            <option>Togo</option>
            <option>Trinidad & Tobago</option>
            <option>Tunisia</option>
            <option>Turkey</option>
            <option>Turkmenistan</option>
            <option>Turks & Caicos Islands</option>
            <option>Uganda</option>
            <option>Ukraine</option>
            <option>United Arab Emirates</option>
            <option>United States of America (USA)</option>
            <option>Uruguay</option>
            <option>Uzbekistan</option>
            <option>Venezuela</option>
            <option>Vietnam</option>
            <option>Virgin Islands (UK)</option>
            <option>Virgin Islands (US)</option>
            <option>Yemen</option>
            <option>Zambia</option>
            <option>Zimbabwe</option>
            </Input>
            </FormGroup>
            </Col>
            <Col sm="3">
            <FormGroup>
                <Label>Zip Code:</Label>
                <Input type="text" name="phone" />
            </FormGroup>
            <Row><Col sm="12">
            <center><HelpBlock>Thank you for your purcahse!</HelpBlock></center>
            <center><Button onClick={this.myClick}>Buy Now</Button></center>
            </Col>
            </Row>
         </Col>
            </Row>
         </FormGroup>
            </Form>
   
    </div>
    
    )
}

}

export default Billing2