import React, { Component } from "react";
import axios from "axios";
import CreatableSelect from "react-select/lib/Creatable";
import styled from "styled-components";

const StyledCreatable = styled(CreatableSelect)`
  border-style: none;
  background-color: #68659e;
  width: 420px;
  margin: 10px auto;
  svg {
    color: white;
  }
  .css-vj8t7z,
  .css-bl6clz,
  .css-2o5izw,
  .css-162g8z5,
  .input-selectable {
    cursor: text;
    border-style: inherit;
    background-color: inherit;
    width: 100%;
    height: 35px;
    color: white;
    padding: 0 20px;
    .css-1g6gooi {
      color: white;
    }
    .css-xp4uvy {
      color: inherit;
    }
    .css-1492t68 {
      color: whitesmoke;
      opacity: 0.6;
    }
  }
`;

export default class CreatableAdvanced extends Component {
  state = {
    isLoading: false
  };

  makeOptions = options =>
    options.map(option => {
      return { value: option.id, label: option[`${this.props.name}_name`] };
    });

  handleChange = (newValue, actionMeta) => {
    this.props.setValue(newValue ? newValue.value : null);
  };
  handleCreate = async inputValue => {
    const { name, familyID } = this.props;
    this.setState({ isLoading: true });
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/${this.props.name}/create`,
      { [`${name}_name`]: inputValue, familyID }
    );
    await this.props.addOption(this.props.name, response.data[0]);
    let responseOption = this.makeOptions(response.data)[0];
    this.props.setValue(responseOption.value);
    this.setState({ isLoading: false });
  };

  render() {
    const { options, value } = this.props;
    return (
      <StyledCreatable
        placeholder={this.props.placeholder}
        isClearable
        className="input-selectable"
        isDisabled={this.state.isLoading ||this.props.isDisabled}
        isLoading={this.state.isLoading}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={this.makeOptions(options)}
        value={
          value ? this.makeOptions(options).find(x => x.value === value) : null
        }
      />
    );
  }
}
