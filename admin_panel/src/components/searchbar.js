import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";

class searchBar extends React.Component {
  constructor(props) {
    super(props);
    this.categories = this.props.categories;
    this.currCat = "";
    this.state = {
      title: "Filter"
    };
  }

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.props.parentFunction({ term: value, fieldname: this.currCat });
  }
  handleSelect(val) {
    this.currCat = val;
    this.setState({
      title: this.currCat
    });
  }

  render() {
    return (
      <div>
        <InputGroup onChange={this.handleChange.bind(this)}>
          <FormControl
            placeholder="Filter Detail's"
            aria-describedby='basic-addon2'
          />
          <DropdownButton
            as={InputGroup.Append}
            variant='outline-primary'
            title={this.state.title}
            id='input-group-dropdown-2'>
            {" "}
            <Dropdown.Item eventKey=''>Select</Dropdown.Item>
            {this.categories.map((elem, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onSelect={this.handleSelect.bind(this, elem, index)}>
                  {" "}
                  {elem}{" "}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </InputGroup>
      </div>
    );
  }
}

export default searchBar;
